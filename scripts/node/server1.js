const express = require('express')
const app = express()
const port = 3100

app.get('/user', function (req, res) {
  res.send({
    env: 'fat',
    name: 'Better',
    age: 18,
    position: 'front-end-engineer',
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
