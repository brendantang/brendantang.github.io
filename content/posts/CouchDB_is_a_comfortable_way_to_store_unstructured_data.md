---
title: "CouchDB Is a Comfortable Way to Store Unstructured Data"
date: 2020-12-11T12:35:33-05:00
draft: true
tags: "technical notes"
---

I have a few projects that require persisting a small amount of loosely structured data.

For example, a client needs to collect email addresses from people who want to be notified when her next sale is coming up.
She doesn't want to start a newsletter campaign or build out a big customer database—she just needs to save a small list of email addresses!

There are tons of ways to save a small amount of data in a pinch—I could even just throw together a Google Form.
Netlify Forms or Vercel Serverless Functions would probably be good options too.

But this client isn't the only one who needs this kind of functionality—I have another client, for example, who is selling just 2 products (for pickup on a specific date) through the Stripe API.
The site I built for them accepts a webhook from Stripe on checkout to save information about the order.

I need to save order information so that the client knows how much of each product to make, but does it really make sense to build a schema for a whole relational model with Customers, Products, and Orders?
What if the third product my client wants to sell has a different distribution model?
Will the constraints I put on those relations still make sense?

## CouchDB as a comfortable interim datastore

With multiple projects that all need to persist a small amount of loosely structured data, it becomes worthwhile to 
introuduce a dedicated schemaless database.


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
