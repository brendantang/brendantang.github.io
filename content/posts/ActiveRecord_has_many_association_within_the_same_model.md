---
title: "ActiveRecord has_many Association Within the Same Model"
date: 2020-12-14T11:19:28-05:00
draft: false
tags: [rails, 'technical notes']
---

In a Rails project I have a data model for `recipes`.
Some recipes belong to other recipes as byproducts—for example, the recipe for 'Whey' is a byproduct of the recipe for 'Cheese.'

This calls for some recipe instances to have a [`has_many`](https://guides.rubyonrails.org/association_basics.html#the-has-many-association) association with their byproduct recipes, which in turn have a [`belongs_to`](https://guides.rubyonrails.org/association_basics.html#the-belongs-to-association) association back to their parent recipe.

To achieve this in Rails, the first step is to create a migration adding a column to the `recipes` table representing that `belongs_to` relation:

```
rails generate migration AddByproductOfRecipeToRecipes
```

Edit the resulting migration file to look like:

```
class AddByproductOfRecipeToRecipes < ActiveRecord::Migration[6.0]
  def change
    add_reference :recipes, :byproduct_of
  end
end
```

And run the migration (`rails db:migrate`).

Since Rails can't derive the foreign key table from the reference column name `byproduct_of_id`, the `belongs_to` and `has_many` declarations in the Recipe model file need some extra arguments:

```
class Recipe < ApplicationRecord
  belongs_to :byproduct_of, optional: true, class_name: 'Recipe'
  has_many :byproducts, class_name: 'Recipe', foreign_key: :byproduct_of
```

See also [this stack overflow answer](https://stackoverflow.com/a/10260455).
