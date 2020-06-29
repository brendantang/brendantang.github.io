# Source for brendantang.net

## Deploy:

~~`rsync -rvh site/ [my ssh login]:brendantang.net`~~

~~The forward slash is important so I copy the contents of the directory, not the directory itself.~~

`/site` directory on production remote copy is symlinked to `/var/www/brendantang.net/html`, so `git push production master` should publish changes.
