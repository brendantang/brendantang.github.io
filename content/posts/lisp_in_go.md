---
title: "Building a Lisp interpreter in Go"
date: 2021-07-10T17:06:50-04:00
draft: false
tags: [go, lisp]
---

I've been interested in programming language design for a while, so I decided to try building a Lisp interpreter to get my feet wet.
Sources I leaned on:
- There's a [really popular post](http://norvig.com/lispy.html) about building a Lisp interpreter in Python, which I found helpful for getting started.
- The [chapter of SICP about the Metacircular Evaluator](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-26.html#%_sec_4.1) helped me understand the general concepts.
- Other interpreters for Lisp in Go provided valuable reference for implementation details.
  - [thesephist/vanta](https://github.com/thesephist/vanta)
  - [go-lisp](https://github.com/janne/go-lisp)

As of today I can run the interactive prompt and do addition and subtraction like this:

```
naive-lisp: (+ 5 (- 2 2))
=> 5
```
Here's a quick tour of my approach:
- Lisp values are represented with an `Expression` interface. To be an `Expression`, a type just has to have a `String()` method which returns a Lisp string representing its value.
  - I have types satisfying `Expression` to represent [`numbers`](https://github.com/brendantang/naivelisp/blob/d4e75df71202c468b0b49067dc7308bd13145a2e/lisp/number.go), [`symbols`](https://github.com/brendantang/naivelisp/blob/d4e75df71202c468b0b49067dc7308bd13145a2e/lisp/symbol.go), [`lists`](https://github.com/brendantang/naivelisp/blob/d4e75df71202c468b0b49067dc7308bd13145a2e/lisp/list.go), and [`procedures`](https://github.com/brendantang/naivelisp/blob/d4e75df71202c468b0b49067dc7308bd13145a2e/lisp/procedure.go).
- The interactive [interpreter](https://github.com/brendantang/naivelisp/blob/d4e75df71202c468b0b49067dc7308bd13145a2e/lisp/interpreter.go#L10) works like this:
  1. Initialize an `Environment`, which maps variable names to their values. Start with the [`standard environment`](https://github.com/brendantang/naivelisp/blob/d4e75df71202c468b0b49067dc7308bd13145a2e/lisp/environment.go#L15) that defines standard values for variable names like `+` and `-`.
  2. Get a line of text input from the user and try to parse it into an `Expression` value. If this doesn't work, display a parse error.
  3. Try to evaluate ([`Eval`](https://github.com/brendantang/naivelisp/blob/d4e75df71202c468b0b49067dc7308bd13145a2e/lisp/evaluate.go)) that `Expression` in the current `Environment`. If that doesn't work, display a runtime error.
  4. Print out the resulting `Expression` and update the `Environment` with the output from `Eval`.
  5. Get another line of input and go back to step 2.
- The [`evaluator`](https://github.com/brendantang/naivelisp/blob/d4e75df71202c468b0b49067dc7308bd13145a2e/lisp/evaluate.go) works like this:
  - Take in an expression and an environment.
  - Match against the type of the expression:
    - If it's a `number`, it evaluates to itself.
    - If it's a `symbol`, it's a variable name. That evaluates to whatever value it binds in the environment. (If it's undefined, that's a runtime error.)
    - If it's a `list`, `apply` its first item to the rest of its items.
      - For now, the only things to `apply` are the primitive procedures `+` and `-`. In a full implementation, you should be able to apply other primitive procedures, as well as compound procedures (procedures made by composing primitives) and special forms (`define`, `if`, and so on).

Some reflection:
- Where other Lisp interpreters in Go that I looked at used proper [S-expressions](https://en.wikipedia.org/wiki/S-expression) for everything, my `list` type was pretty much just a wrapper for a Go `slice`. [`lis.py`](http://norvig.com/lispy.html) similarly just just uses Python lists, but I'd like to go back and try using a linked list instead.
- Increased appreciation for Go. It has fewer features than a lot of other languages, and strongly-established idioms. I felt like that helped me stay focused on the right details in a project with few constraints (compared to, say, a web app built with a framework).
- Getting this far wasn't as hard as I thought it would be! After I build out more Lisp features, I'm excited to try building an interpreter for another language. Maybe something concatenative like Forth? Maybe something statically-typed? Looking forward to building an interpreter for a language with some of my own design decisions.
