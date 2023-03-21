const express = require('express')
const app = express()

//Routes
app.get("/", (req, res) => {
    res.send("Welcome to NODE CRUD")
})

app.listen(8080, () => {
    console.log(`App running on http://localhost:8080`)
})