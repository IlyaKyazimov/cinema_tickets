const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = express.Router()

app.use(express.static(__dirname + '/'))
app.use("/", router)
app.listen(port);