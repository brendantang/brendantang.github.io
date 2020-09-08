---
title: "Recursive and Iterative Programs"
date: 2020-09-08T11:25:26-04:00
draft: true
tags: [computing, technical notes, SICP]
---

Technical notes on two kinds of programs, based on Gerald Jay Sussman's [lecture 1B](https://www.youtube.com/watch?v=V_7mmwpgJHU&list=PLE18841CABEA24090&index=2) from the classic course _Structure and Interpretation of Computer Programs_.[^1]
By breaking down the technical difference between __iterative__ and __recursive__ programs,
we see how the shape of the instructions we give to the computer affects the resources it will use in the form of _space_ and _time_
(which roughly correlate, I think, to memory and CPU).

In the lecture, GJS shows two different programs for the sum of two positive integers.

The __iterative__ program goes like this:

```
(pseudocode)

to get the sum of X and Y:
  if X is 0
    the answer is Y
  otherwise
    get the sum of the decrement of X and the increment of Y 
```

Where `decrement` and `increment` of a number are more primitive functions which return the number 'before' or 'after' it.

In formal lisp the iterative program looks like:

```lisp
DEFINE (

```

[^1]: The SICP course is distributed under the Creative Commons license: BY-NC-SA, so this post must be as well. https://ocw.mit.edu/terms/
