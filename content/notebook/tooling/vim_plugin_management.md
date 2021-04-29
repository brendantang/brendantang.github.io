---
title: vim plugin management with git submodules
tags: [vim, unix, git]
---

There are a few plugin managers for vim where you just list your plugins in your `.vimrc`.

But since vim 8, any plugins that vim finds in the path `~/.vim/pack/*/start/` get loaded on startup.
So you can initialize your whole .vim directory as a git repo and use git submodules to install vim plugins.

Install a new plugin:

```
git submodule add REPO_URL pack/plugins/start/PLUGIN_NAME
```

Update plugins:

```
git submodule update --remote --merge
git commit
```

Reinstall from scratch:

```
# Checkout my whole ~/.vim directory
git checkout github.com/brendantang/dot_vim $HOME/.vim

# I think to checkout the plugins you do:
# git submodule pull
# or something, but I haven't had to do this yet lol
```

Temporarily disable a plugin:

```
mv .vim/pack/plugins/start/some_plugin .vim/pack/plugins/opt/
```

Note: not sure if it's better to use a git submodule command to move plugins into opt?
