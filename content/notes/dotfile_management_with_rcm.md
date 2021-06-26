---
title: Dotfile management with rcm
date: 2021-04-28
tags: [dotfiles, unix, tooling]
---

[rcm](https://github.com/thoughtbot/rcm) is a really nice little program that puts your dotfiles in one directory and lets you track them with git.[^my_dotfiles]

Let's say you have an existing `.vimrc` file you want to manage with `rcm`.
- Run `mkrc ~/.vimrc`
- Now you have `~/.dotfiles/vimrc` (notice the leading `.` is gone).
- `~/.vimrc` is now a symlink to `~/.dotfiles/vimrc`.

`mkrc` works with nested directories too, so you can run `mkrc ~/.config/bat/config` and get `~/.dotfiles/config/bat/config`.

Let's say you make a new file `~/.dotfiles/bashrc`.
- Run `rcup bashrc`
- Now you have a symlink `~/.bashrc` to `~/.dotfiles/bashrc`

If you just run `rcup -v` it will update symlinks for everything in `~/.dotfiles`.

[^my_dotfiles]: [my dotfile repo](https://github.com/brendantang/dotfiles)
