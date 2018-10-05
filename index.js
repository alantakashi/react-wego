const express = require('express')
const http = require('http')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const httpProxy = require('http-proxy')
const app = express()

const apiProxy = httpProxy.createProxyServer({
  target: 'http://localhost:8089'
})

app.use('/api', function (req, res) {
  apiProxy.web(req, res)
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

http.createServer(app).listen(80)
module.exports = app
