---
title: "CouchDB Is a Comfortable Way to Store Unstructured Data"
date: 2020-12-11T12:35:33-05:00
draft: true
tags: ["technical notes", 'couchdb']
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
Will the constraints I put on the database still make sense?

## Prefer a schemaless database for 'casual' data

I want one consistent, easy way to handle this kind of "casual" database requirement.
For now I have landed on self-hosting a single document database service which can hold persist loosely structured data for multiple frontend applications.

A "schemaless" document database works well for these situations where scaffolding out a rigid data model would be overkill.
I just want to save a list of whatever email addresses people submit into a form.
I don't want to deal with decisions like, "What should I name the table that has an `email` column? Should email be a required field for that table? Should I validate the uniqueness of an email?"

With a document database I can just create a table and start throwing json objects in there:

```
{'email': 'foo@example.com'},
{'email': 'bar@example.com'}
```

The data has enough structure that it would be manageable to later treat each document as a `customer`, adding in fields like `order_ids: []` etc.
Or maybe the client decides she wants to commission a GUI backend where she can view and edit data about her customers and their orders.
It's easy enough to take those json documents and write a script to seed a more traditional relational database with them.

It may be true that "schemaless database" is a bit of a misnomer, since there's always an "implied schema."
If my application logic breaks down when it tries to access the `email` field on a `customer` object, then there is functionally a `NOT NULL` constraint on the email field—it's just not explicit.

I'd prefer to have an explicit schema when developing a complex client-facing UI to work with the data.
But if the client's main interface to the data is just like, me emailing them a spreadsheet once a month, it can be more work to design a schema than it's worth!

## CouchDB

I like CouchDB for this purpose because the primary way to interact with your database is already just a REST API.
I don't have to worry about installing any database driver or ORM packages.
Want to save an email address? Just make an HTTP request:

```
const saveEmail = async (email) => {
  const id = // Generate a uuid
  # Example database url below. Obscure this in your actual code!
  const dbResponse = await fetch(`https://COUCHUSER:PASSWORD@HOSTNAME:PORT/my-clients-newsletter-db/${id}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  const data = await dbResponse.json();
  console.log(data)
}
```

No need to deal with users, authentication, etc.
Just store that database url in an environment variable, and obviously don't expose it in your client-side code.
On CouchDB's end, set the CORS rules to only accept requests from your application's domain.

And since there's no client-facing portal to the database, it's fine to use a single database service for multiple projects.
With a SQL database you might spin up a separate docker container to run the postgres backend for each application, store the database credentials in your app's environment variables, and interface your application with the database using some ORM package or database driver.
With this more casual CouchDB solution, you can just open up Fauxton (the admin UI), click "Create database," save the database's url in your app's environment variables, and then use it to start making requests.

When it's time to retrieve that list of emails, I can just open up my terminal and make a request:

```
curl 'https://USERNAME:PASSWORD@HOST:PORT/my-clients-newsletter-db/_all_docs?include_docs=true'
```

If I want more programmatic ways of working with the data, Couch offers tons of ways to index, filter, and iterate over the documents via [design documents and views](https://docs.couchdb.org/en/stable/ddocs/index.html).

But for most of these casual use cases, I'm totally happy to just dump all my json data into a file and write a little script to like, format it into a csv or something.

That's my use case and justification for CouchDB. 
I'll write another post later documenting how I manage my installation.
