---
title: "Advent of Code 2020 in Haskell"
date: 2021-01-31T16:31:47-05:00
draft: true
tags: [haskell]
---

I've been playing around with Haskell for a bit now and have decided use it to solve some of the puzzles in last year's [Advent of Code](https://adventofcode.com).

Usually I find it hard to motivate myself to try "coding exercises" like this.
In general I have more momentum when I'm just trying to build something I want to use and learning things along the way.
But Haskell is really different from anything I'm used to, so I have a lot of fundamentals to learn before I can build anything useful.
The puzzles in Advent of Code have kind of the perfect difficulty level for me at this stage.
Bouncing between these puzzles and a couple of books[^books] has been a surprisingly satisfying way to pick up the language.

I thought I would keep some notes as I go through it.
These notes probably won't mean much to you unless you are one of the following:

- Me
- Also learning Haskell, wanting to see the thought process of a fellow beginner

For these notes or my code to make any sense, you'll probably need familiarity with concepts in, say, the first couple chapters of [LYAH](http://learnyouahaskell.com), and of course the AOC problem that I'm working on.


## Day 1 - Report Repair

- [Problem](https://adventofcode.com/2020/day/1)
- [My solution](https://github.com/brendantang/aoc_2020_haskell/blob/main/day1/day1.hs)

I learned a lot with this first one!

```
module Main where
import Data.List (tails, nub, sort)
```

- A module called `Main` compiles to an executable (a program you run) rather than a library (some definitions you import in other code).
- In the second line I'm importing the definitions `tails`, `nub`, and `sort` from the standard `Data.List` module.

```
main = do
  ledger <- getContents
```

- The function called `main` defines what will happen when we run the compiled executable.
- I still don't quite understand `do` notation, but I get that inside of `do`:
  - you're allowed to do some I/O, like `ledger <- getContents`, which reads from standard input and binds the result to the name `ledger`.
    (I pipe the file contents into the compiled executable like `cat expense_report.txt > ./day1`.)
  - The last line inside the `do` has to return an I/O action, in this case `print` which prints its argument to standard output.

```
duosWithSum :: Int -> [Int] -> [(Int, Int)]
duosWithSum n xs = [(x,y) | (x:ys) <- tails (nub xs)
                            , y <- ys
                            , y + x == n]
```

This function gave me my first taste of solving problems the "Haskell way."
The first part of Day 1's problem asks you to find the two numbers in a long list of random numbers that add up to 2020.
In a familiar imperative language I might say something like, 
"for each number in the list, add it to each other number in the list. 
If that sum is 2020, stop and give me those two numbers."
In Ruby that might look like:

```
# expenses = [1753, 1976, 1574, 308, 1384, 1191, 1731, 1829 ...]
combo = []
expenses.each do |expense|
  other_expenses = expenses - [expense]
  other_expenses.each do |other|
    if expense + other == 2020
      combo = [expense, other]
    end
  end
end 
```

(Of course if you were to do that you should just use Ruby's [`Array#combination`](https://docs.ruby-lang.org/en/3.0.0/Array.html#method-i-combination) method, but I'm illustrating the imperative approach to this problem.)

Using a [list comprehension](http://learnyouahaskell.com/starting-out#im-a-list-comprehension) like I did in my solution is a _declarative_ way to solve the same problem.
Instead of saying what to do, I'm saying what I want: 

  ```
  [(x, y) |
  ```    
  
_Give me all pairs `x`, `y` where..._
  
  ```
  (x:ys) <- tails (nub xs), y <- ys
  ```
  
_`x` is any distinct number in the list and `y` is any other distinct number in the list_
  
 ```
 , y + x == n
 ```     
 
_and `x + y = 2020`._

It took me a long time to figure out what was going on in my list comprehension, and it's going to take me a while to be able to read and write them with reasonable efficiency.
I had to work my way backwards from a more generalized solution I [found on the Haskell wiki](https://wiki.haskell.org/index.php?title=99_questions/Solutions/26&oldid=57435).

I'm sure my code could be a lot more readable and a lot more idiomatic.
But it feels pretty exciting to express a solution in a radically different way than I'm used to, and I can't wait to see what other ways of thinking and writing about problems Haskell will lead me to.


[^books]: I like [Learn You A Haskell](http://learnyouahaskell.com/chapters) but I use it more like a reference book.
Despite the quirky/energetic narration, it's way too slow for me to read it from start to finish.
But when I encounter a new term and need a thorough, plain English explanation of it with examples, I go right to the table of contents for LYAH.
  The other book I like is [Haskell Programming From First Principles](https://haskellbook.com), which is actually slower, but does a great job explaining the conceptual underpinnings of the language's design, which is important for the way I learn.
