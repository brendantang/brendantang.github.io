---
title: "The Timestamp Method Used in Rails Migration Files"
date: 2020-09-21T14:02:43-04:00
draft: true
tags: [rails, technical notes]
---

A Rails project of mine needed to generate log files with timestamps.
I decided to use the same timestamps used by Rails when you generate migration files,
which is just a string of 14 digits: year, month, date, hours, minutes, seconds.

The method is just this:[^1]

```
Time.now.utc.strftime("%Y%m%d%H%M%S")
```

I always forget the `strftime` directives. They're [here](https://apidock.com/ruby/DateTime/strftime).


[^1]: This line in the [Rails source](https://github.com/rails/rails/blob/3d428777b05701ca7211a1be723cb1ee0e094bd9/activerecord/lib/active_record/migration.rb#L982)
