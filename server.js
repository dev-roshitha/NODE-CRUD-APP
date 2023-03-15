require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-sessions')

const app = express()
const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send("Welcome to NODE JS")
})

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`)
})