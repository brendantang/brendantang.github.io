---
title: Enable CORS in Rails
slug: cors-in-rails
tags: [rails]
date: 2021-04-24
---

You have to explicitly allow **Cross Origin Resource Sharing** to access your Rails API from another domain, like if you have a separate javascript frontend and a Rails backend.

This was the best link I found: https://medium.com/ruby-daily/understanding-cors-when-using-ruby-on-rails-as-an-api-f086dc6ffc41

`No 'Access-Control-Allow-Origin' header is present on the requested resource.` is the error message you get when you try to make CORS requests without enabling it.

## Enable CORS

- add `gem 'rack-cors'` to Gemfile
- `bundle install`

```ruby
# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Whitelist the origins that can access your API
    origins 'http://localhost:3000' 

    # Allow CORS on all resources
    resource '*',
      headers: :any,
      methods: [:get]
  end
end
```
