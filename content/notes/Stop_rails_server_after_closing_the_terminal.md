---
title: "Stop Rails Server After Closing the Terminal"
date: 2020-12-06T13:49:20-05:00
draft: false
tags: [technical notes, rails]
---

I always accidentally close the terminal window where my local `rails server` process is running, and every time I have to look up the command to find the process id and kill it so I can restart the server.
So I'm just writing it down here:

```
lsof -i tcp:3000
kill <PID>
```

([Stack overflow answer that I've read 1,000,000 times](https://stackoverflow.com/a/3855359))



