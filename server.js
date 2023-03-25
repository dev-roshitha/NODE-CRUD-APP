const express = require('express')
const mongoose = require('mongoose')
const Product = require("./models/productModel")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("uploads"))

app.set("view engine", "ejs")

//Set DB Connection
mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://rosh:rosh123@cluster0.rj7ysis.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("Database connected Successfully")
}).catch((error)=>{
    console.log(error)
})

//Routes Prefix
app.use("", require("./routes/routes"))


// app.get("/products", async(req, res) => {
//     try {
//         const products = await Product.find({})
//         res.status(200).json(products)

//     } catch (error) {
//         res.status(500).json({message: error.massage})
//         console.log(error)
//     }
// })

// app.get("/products/:id", async(req, res) => {
//     try {
//         const {id} = req.params
//         const product = await Product.findById(id)
//         res.status(200).json(product)
        
//     } catch (error) {
//         res.status(500).json({message: error.massage})
//         console.log(error)
//     }
// })

// app.put("/products/:id", async(req, res) => {
//     try {
//         const {id} = req.params
//         const product = await Product.findByIdAndUpdate(id, req.body)
//         if(!product){
//             return res.status(404).json({message: `cannot find product with ${id}`})
//         }
//         const updatedProduct = await Product.findById(id)
//         res.status(200).json(updatedProduct)

//     } catch (error) {
//         res.status(500).json({message: error.message})
//         console.log(error)
//     }
// })

// app.delete("/products/:id", async(req, res) => {
//     try {
//         const {id} = req.params
//         const product = await Product.findByIdAndDelete(id)
//         if(!product){
//             return res.status(404).json({message: `cannot find product with ${id}`})
//         }
//         res.status(200).json(product)

//     } catch (error) {
//         res.status(500).json({message: error.message})
//         console.log(error)
//     }
// })

// app.post("/products", async(req, res) => {
//     try{
//         const product = await Product.create(req.body)
//         res.status(200).json(product)

//     }catch(error){
//         console.log(error.message)
//         res.status(500).json({
//             message: error.message
//         })
//     }
// })

app.listen(8080, () => {
    console.log(`App running on http://localhost:8080`)
})