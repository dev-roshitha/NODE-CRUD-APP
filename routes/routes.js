const express = require("express")
const router = express.Router()
const Product = require("../models/productModel")
const mongoose = require("mongoose")
const multer = require('multer')

//Image upload
let storage = multer.diskStorage({
    destination: function(req ,file, cb){
        cb(null, './uploads')
    }, 
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname)
    }
})

let upload = multer({
    storage: storage,
}).single("image")

//insert records to database
router.post("/add", upload, async(req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            image: req.file.filename
        })
        console.log(`product added successfully ${product}`)
        res.redirect("/")

    } catch (error) {
        res.json({message: error.message, type: 'danger'})
        console.log(error)
    }
})

// Root Route
router.get("/", (req, res) => {
    res.render('index', { title: "Home" })
})

router.get("/addProduct", (req, res) => {
    res.render('addProduct', { title: "Add Product" })
})

// fetch data from DB GET
router.get("/products", async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router