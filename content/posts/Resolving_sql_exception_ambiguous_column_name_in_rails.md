---
title: "Resolving SQLException: ambiguous column name in a Rails project"
date: 2020-10-12T14:45:19-04:00
draft: false
tags: [rails, technical notes]
---

In my current project, I have a model concern which contains shared scopes for filtering and sorting records.
For instance, I have the models `recipes,` `batches,` and `pack_dates.`
Both `recipe` and `pack_date` are associated with a `recipe` through a `belongs_to` association.

By including my `FilteringScopes` module, both `batch` and `pack_date` get access to a `with_recipe` scope which returns only those records which belong to the given recipe (among other filtering and sorting scopes).

```
# app/models/concerns/filtering_scopes.rb
 
require 'active_support/concern'

module FilteringScopes
  extend ActiveSupport::Concern

  included do

    scope :with_recipe,
          lambda { |recipe_code|
            where(recipe: Recipe.find_by(code: recipe_code))
          }
```

Initially I had the `with_recipe` scope written like this:

``` 
scope :with_recipe,
      lambda { |recipe_code|
        where('recipe_id = ?', Recipe.find_by(code: recipe_code).id)
      }
```

But I found that using this string format would get me into trouble in some situations where Rails didn't know whether to look at the `recipe_id` column of the `pack_dates` table or the `batches` table, and I would get this error:

```
ActionView::Template::Error: SQLite3::SQLException: ambiguous column name: recipe_id
```

Switching from the string form of the `where` method to the hash form resolved this for me.
