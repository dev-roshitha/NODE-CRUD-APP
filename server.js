const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://rosh:<password>@simplemern.p6hq46y.mongodb.net/?retryWrites=true&w=majority')

//Routes
app.get("/", (req, res) => {
    res.send("Welcome to NODE CRUD")
})

app.listen(8080, () => {
    console.log(`App running on http://localhost:8080`)
})