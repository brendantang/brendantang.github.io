---
title: "Deploying a Ghost Site on Dokku"
date: 2020-10-24T13:44:46-04:00
draft: true
toc: true
tags: [technical notes, dokku, containers]
---

I'm hosting a few [Ghost](https://ghost.org) sites (alongside other apps) on my server.
Ghost is not a particularly painful app to deploy.
I've installed it using the official [instructions for Ubuntu](https://ghost.org/docs/install/ubuntu/), and the Digital Ocean [1-click deploy](https://marketplace.digitalocean.com/apps/ghost) thing is even easier.

But since I'm already using [Dokku](http://dokku.viewdocs.io/dokku/) to manage a bunch of other app deploys on the same server, I figured I would use it to manage the Ghost deploys too.

Steps to deploy Ghost on Dokku:

- Create a Dokku app from the Ghost [image](https://hub.docker.com/_/ghost/) in the docker registry
- Make the app available on a public port
- Give the app persistent storage
- Configure the database
- Configure the mailer

If I were to install Ghost on a server alongside other apps, I would have to do all of those steps anyway to make sure its configuration plays nicely with my configuration for the other apps.
Managing the deploy as a Docker container via Dokku makes the steps quick and easily repeatable.

__[TLDR](#tldr)__

## Create the Ghost app from the community maintained docker image

ssh into your dokku server:
~~~
ssh root@<your-server-address> 
su dokku
~~~

Every step here is done from inside this ssh session on the dokku host. 
Since everything that's unique to your ghost app should be separate from the Ghost codebase,
you shouldn't have any local repo to deploy from.

Pull the Docker community [Ghost image](https://hub.docker.com/_/ghost/)
```
docker pull ghost:latest
```
You only have to do this step once, and your Dokku server will have a local copy of the Ghost image as a base for as many deployments as you like.

Make a Dokku app for your deployment:
```
dokku apps:create some-ghost
```

Tag the Ghost image so that Dokku knows how to deploy your app from it: 
```
docker tag ghost:latest dokku/some-ghost
```

Start your Ghost deployment from that tag: 
```
dokku tags:deploy some-ghost latest
```

## Make the app available over http

The ghost app is now running but it's not mapped to any public port.
By default the container port 2368 is mapped to the host port 2368.
Instead map it to port 80:
```
dokku proxy:ports-set ghost-test http:80:2368
```
Now the app should be available at `http://some-ghost.<your-server-address>`, assuming Dokku is set up to assign subdomains.

### Get a certificate for https

Before doing anything else, use the letsencrypt plugin to get an SSL certificate.  
```
dokku letsencrypt some-ghost
```

## Persistent storage

Dokku apps start with a fresh filesystem every time they are deployed, which is good.
It means you have to explicitly isolate the parts of the filesystem that you want to keep and mount them as Docker [volumes](https://docs.docker.com/storage/volumes/).

The Dokku way to do that:

~~~
mkdir /var/lib/dokku/data/storage/some-ghost-data
dokku storage:mount some-ghost /var/lib/dokku/data/storage/some-ghost-data:/var/lib/ghost/content
dokku ps:restart some-ghost
~~~
> ⚠️ You would think the mount point in the container would be `/var/lib/ghost`, but it's `/var/lib/ghost/content`.
> If you get this wrong, you'll get an error message like this: 
> ([this github issue helped me](https://github.com/TryGhost/Ghost/issues/9429))


## Set environment variables

Everything you need for your Ghost deployment to work is set with environment variables. 
Dokku manages each deployment's environment variables with a command, which is a [better practice](https://12factor.net/config) than loading them from a file or something.

`dokku config:set --no-restart some-ghost var=value`

Reference for all the environment variables that Ghost cares about is [in the Ghost docs](https://ghost.org/docs/concepts/config/#running-ghost-with-config-env-variables).

### URL variable
`dokku config:set some-ghost url=some-ghost.<your-server>`
  - Otherwise all your links will look like `http://localhost:2368/whatever`)

### Mailer configuration

[Mail configuration](https://ghost.org/docs/concepts/config/#mail) is required to get password recovery emails or invite other users.
I (obviously) like self-hosting everything, but when it comes to SMTP, anything other than an external service like Mailgun just seems like an enormous fucking pain.

~~~
dokku config:set some-ghost \
  mail__transport=SMTP \
  mail__options__service=Mailgun \
  mail__options__auth__user=yourpostmaster@yourmaildomain \
  mail__options__auth__pass=your-smtp-password \
  # Optionally configure a custom from address:
  mail__from="'Some Ghost Robot' <yourfromaddress@example.com>"
~~~
 
### Database configuration (optional)

The Ghost docker image defaults to using a sqlite3 database, which is just a file that lives inside of that volume we created as persistent storage.

If you want to use an actual MySQL database instead, the [dokku mysql plugin](https://github.com/dokku/dokku-mysql) makes it super easy:

~~~
# mysql plugin has to be installed! see ☝️
dokku mysql:create some-ghost-db
dokku mysql:link some-ghost-db some-ghost
~~~

Now you can see the URL which can be used within the Ghost container to access the database:
~~~
dokku config:show some-ghost
=====> ghost-test env vars
DATABASE_URL:
  mysql://mysql:<some_long_random_password>@dokku-mysql-ghost-test-db:3306/ghost_test_db
...
~~~

That url is structured like this:
`<protocol/db client>://<username>:<password>@<host>:<port>/<database_name>`

So to map that information to the database variables used by Ghost:

~~~
dokku config:set some-ghost \
  database__client=mysql \
  database__connection__host=dokku-mysql-some-ghost-db \
  database__connection__port=3306 \
  database__connection__user=mysql \
  database__connection__password=<that_long_random_password> \
  database__connection__database=some_ghost_db 
~~~

One reason to prefer this over sticking with the default sqlite3 is that you can also use the plugin to very easily schedule automatic [backups](https://github.com/dokku/dokku-mysql#backups).


## TLDR:

```
ssh root@<your-server-address> 
su dokku

docker pull ghost:latest
dokku apps:create some-ghost
docker tag ghost:latest dokku/some-ghost
dokku tags:deploy some-ghost latest
# dokku domains:add some-ghost example.com www.example.com
dokku proxy:ports-set ghost-test http:80:2368
dokku letsencrypt some-ghost

mkdir /var/lib/dokku/data/storage/some-ghost-data
dokku storage:mount some-ghost \
  /var/lib/dokku/data/storage/some-ghost-data:/var/lib/ghost/content
dokku ps:restart some-ghost

dokku config:set some-ghost \
  mail__transport=SMTP \
  mail__options__service=Mailgun \
  mail__options__auth__user=yourpostmaster@yourmaildomain \
  mail__options__auth__pass=your-smtp-password \
  # Optionally configure a custom from address:
  mail__from="'Some Ghost Robot' <yourfromaddress@example.com>"
  
dokku mysql:create some-ghost-db
dokku mysql:link some-ghost-db some-ghost

dokku config:get some-ghost DATABASE_URL
dokku config:set some-ghost \
  database__client=mysql \
  database__connection__host=dokku-mysql-some-ghost-db \
  database__connection__port=3306 \
  database__connection__user=mysql \
  database__connection__password=<that_long_random_password> \
  database__connection__database=some_ghost_db 
```
