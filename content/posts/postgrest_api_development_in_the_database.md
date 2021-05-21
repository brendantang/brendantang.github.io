---
title: "Considering PostgREST, and API development in the database layer"
date: 2021-05-21T10:23:59-04:00
draft: false
tags: [postgres, postgREST, backend development, database admin]
---

For a long time, conventional wisdom has said you should implement as little of your business logic as possible in the database layer, and instead keep as much as possible in your application code.
So for example, you'd write code instructing your web server to:
   
  - based on request URL and parameters, figure out what data the client wants to save to or retrieve from storage:
    > "client wants to see profile of user `@brendan`"
   
  - figure out if the client has permission to save or retrieve the requested data:
    > "profile of user `@brendan` is private"
   
    > "you can't edit another user's profile"
   
  - figure out if the changes the client wants to make are valid
    > "there is already a user with this email address"
   
  - build an efficient query to grab the requested data from storage

  - parse the query results from storage into a useful format for the client to read


For the most part, you're supposed to avoid implementing any of that logic in the database layer itself.
Using `NOT NULL` and `FOREIGN KEY` constraints are encouraged to strengthen your app's validation logic, but that's about it.

I get the appeal of this paradigm.
You probably don't want to implement your business logic more than once, and you also don't want to risk your database layer and application layer getting out of sync.
I also get that people enjoy working in whatever language they chose, and would rather write, i.e., Ruby than SQL.


On the other hand, database software like Postgres is super mature, reliable, fast, and feature rich.
And SQL itself is super simple, declarative, and perfectly suited to its domain.
Postgres has everything you need to build a relational data model with fine-grained permissions, conditional validations, and complex view logic.
And you can implement it all in declarative, version-controlled SQL and plpgsql without having to worry much about performance.
The only part of your web app that Postgres can't handle on its own is the HTTP server and the browser front end.


With all that in mind, I like the idea of turning the conventional wisdom about the database and application layers on its head.
Could you spend most of your time building a web API in the database layer, and have your server code just act as a thin layer between HTTP and Postgres?


[PostgREST](https://postgrest.org/) is a really interesting open source project that essentially lets you take that approach.
Since REST APIs have such a well-defined convention regarding how relational database tables map to HTTP requests, PostgREST can just read a database schema and a little config file, and start serving a full REST API.


To paraphrase the official [tutorial](https://postgrest.org/en/stable/tutorials/tut0.html), you can basically just:

- define your schema:
  ```
  CREATE SCHEMA api;
  CREATE TABLE api.todos (
    id SERIAL PRIMARY KEY
    task TEXT NOT NULL
    -- etc...
  );
  ```
- write a little config:
  ```
  # my_api.conf
  db-uri = "postgres://....."
  # etc
  ```
- fire up PostgREST:
  ```
  postgrest my_api.conf
  ```
- and you've got REST endpoints!
  ```
  curl http://..../todos
  ```
  ```
  [
    {
      "id": 1,
      "task": "some task title",
      ...
    },
    ...
  ]
  ```
  
You can also handle permissions with the native database features of [`roles`](https://www.postgresql.org/docs/current/database-roles.html) and [`grants`](https://www.postgresql.org/docs/13/sql-grant.html).
PostgREST then provides a way to authenticate clients to use `roles` via `JWT`.
So between your database schema and that tiny config file, you can declare all the business logic for your API, and the rest of the boilerplate (defining endpoints, serving error codes, encoding/decoding JSON) is automated away.


I think this is a pretty promising approach, and I'm excited to explore it more.
I think it's a really cool idea that I could just write a SQL schema, a little config file and then a frontend using whatever framework I want, and that's a full stack application right there!
Hoping to try that soon and write it up.
