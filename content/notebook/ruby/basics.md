---
title: Ruby basics
tags: [ruby]
---

**These notes are pretty old and not well organized!**

because ruby’s integers are objects they have methods

a block in Ruby is a parameter passed into a method call

an array is an ordered collection of elements indexed starting at 0. square brackets, commas

a hash is an unordered collection of key/value pairs. curly braces, pairs joined by rockets (`=>`), and comma separated

logical and is `&&`
logical or is `||`

assigning a variable to a variable just points to the value, it does not create a reference like in Lua

every function is a method
like `5 + 3` is `5.+ 3` meaning we call 5’s `+` function passing in `3`. `puts` is a method of the whole program (self when you aren’t in another object, or the **kernel**)

exponents are `**`

modulus is `%` (remainder)

`.abs` gets you absolute value

`each` is a method for arrays that’s like a loop - it’s an iterator (a method that acts like a loop)
iterators need do - while and if don’t need it
iterators pass each step into the variable you surround with |

variables defined inside methods are local to that method

the value returned from a method is the last line of that method (unless it was instructed to return something earlier using the return keyword)

String, Array, Float, Integer, are all prepackaged Classes

variables that are local to each instance of a class start with `@`. if you want to use them later define a method which returns the variable


The iterator `Array#collect` (or `#map`) invokes the given block once for each element of self. Then creates a new array containing the values returned by the block.


Technically you *pass arguments to methods* and *methods receive parameters* (they’re the same thing but that’s the usage)

**Constants** are given variable names that start with a capital letter. like Pi. Classes are named the same way because *classes are constants*!

inserting the result of expressions and logic into a string is called **interpolation.** you interpolate in a string with `#{variable name}`

**single quote strings** don’t allow interpolation or escape characters (except escaping the single quote or the backslash)
**double quote strings** allow interpolation and escape characters

**ranges**   two dots are inclusive, 3 excludes the last number
`(3..11)` is the same as `(3…12)` is the same as
~~~
Range.new(3,11) is 3, 4, 5, 6, 7, 8, 9, 10, 11
~~~

`===` asks if the thing on the right is a part of the thing on the left
~~~
(1..3) === 3
true
~~~

**bang methods** end with an exclamation point and actually modify the original object

methods ending in a question mark return true or false
