const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.set("strictQuery", false)

mongoose.connect('mongodb+srv://rosh:rosh123@cluster0.rj7ysis.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("Database connected Successfully")
}).catch((error)=>{
    console.log(error)
})

//Routes
app.get("/", (req, res) => {
    res.send("Welcome to NODE CRUD")
})

app.get("/product", (req, res) => {
    console.log(req.body)
})

app.listen(8080, () => {
    console.log(`App running on http://localhost:8080`)
})