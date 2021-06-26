---
title: Working with CSV files in Ruby
tags: [ruby, scripting, csv]
date: 2021-04-28
---

Often I want to write a quick throwaway script to do some transformation on a CSV! 
It's easy but I often forget the specifics.

```ruby
# CSV is in the standard lib but you still have to `require` it
require "csv"

# Read a CSV file into an object in memory
my_csv = CSV.read("path_to_my.csv", headers: true)

# Using that `headers: true` option allows you to access values in a row by header name:
csv.each do |row|
  puts row["Email address"] 
  
  # you can perform some mutation on each row—just treat it like a hash
  row["First name"].downcase! # mutate values
  row["Full name"] = row["First name"] + row["Last name"] # add a new column
end

# Access a whole column like this:
puts csv["Email address"]

# Quick way to write CSV object to a file:
File.write("destination.csv", my_csv) # might want option `write_headers: true`

```

It's nice to work with this stuff in `irb` too.
