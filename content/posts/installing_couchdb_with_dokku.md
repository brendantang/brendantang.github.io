---
title: "Installing CouchDB With Dokku"
date: 2020-12-12T10:03:03-05:00
draft: true
tags: ["technical notes", couchdb, docker, dokku]
---

I host a bunch of small, custom web applications for multiple clients.
I use [Dokku](http://dokku.viewdocs.io/dokku/) to deploy them all in separate containers on a single virtual private server.
It's a pretty nice setup for my needs—I get most of the convenience of a PaaS like [Heroku](https://www.heroku.com), but it's a little bit cheaper.

In an [earlier post]({{< relref "/posts/CouchDB_is_a_comfortable_way_to_store_unstructured_data.md" >}}), I described my use case for [CouchDB](https://couchdb.apache.org).
A lot of these small custom apps have a 'casual' data storage requirement—they need to accept and persist a little bit of user data, but it's yet to be determined how/if that data should fit into a structured/relational data model.

For example, a client wants to collect the email addresses of people who are interested in an upcoming sale.
If she wanted to start a whole newsletter campaign, maybe it would make sense to submit those emails directly to Mailchimp or whatever.
Or maybe she'll want to build out a customer database and associate those emails with customers and their orders.
But I don't know any of that!
For now I just want to save a list of emails!

Since multiple applications require this sort of casual, as-yet-unstructured data persistence, I run a single CouchDB service and use it almost like a filing cabinet.

Any time an application needs to save some form data but doesn't have anough structure yet to justify its own data model, I can just:
- Open up the CouchDB GUI (Fauxton)
- Click "create a database"—name it something like "my-app-form-data." I think of this like labelling a new folder and sticking it in my "filing cabinet."
- Have my app submit its form data to that database with a plain old POST request. No configuration or `npm install` needed!

That [earlier post]({{< relref "/posts/CouchDB_is_a_comfortable_way_to_store_unstructured_data.md" >}}) has a bit more on my justification for this use case—this one focuses on how I manage my CouchDB installation and integrate it with my other apps.


## Installing CouchDB on Dokku

There is an official [dokku plugin for CouchDB](https://github.com/dokku/dokku-couchdb).

If you just want to deploy an app directly from an image in the docker hub to your dokku instance:

- `dokku apps:create myapp`
- SSH into server and:
  - `docker pull some-image:latest`
  - `docker tag some-image:latest dokku/myapp:latest`
- `dokku tags:deploy myapp latest`

http://dokku.viewdocs.io/dokku/deployment/methods/images/#deploying-from-a-docker-registry

The additional step you need to take for CouchDB is to set the administrator username and password in environment variables

`dokku config:set couch COUCHDB_PASSWORD=some_secure_password COUCHDB_USER=some_admin`

Couch doesn't automatically serve over normal http ports, so you need to configure nginx and letsencrypt (for https)

```
dokku nginx:ports-add couch http:80:5984
dokku letsencrypt
```
