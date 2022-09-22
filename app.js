const express = require('express')
const router = require('./routes/router')
const userRouter = require('./routes/userRouter')
const carRouter = require('./routes/carRouter')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/', router);
app.use('/users', userRouter)
app.use('/cars', carRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})