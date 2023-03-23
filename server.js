const express = require('express')
const mongoose = require('mongoose')
const Product = require("./models/productModel")
const app = express()

app.use(express.json())

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

app.post("/product", async(req, res) => {
    try{

        const product = await Product.create(req.body)
        res.status(200).json(product)

    }catch(error){
        console.log(error.message)
        res.status(500).json({
            message: error.message
        })
    }
})

app.listen(8080, () => {
    console.log(`App running on http://localhost:8080`)
})