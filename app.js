const express = require('express')
app = express()
const port = 9090

app.use(express.static('site'))

app.listen(port, () => console.log(`listening on http://localhost:${port}`))
