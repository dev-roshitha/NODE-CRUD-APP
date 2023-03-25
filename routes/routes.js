const express = require("express")
const router = express.Router()
const Product = require("../models/productModel")
const mongoose = require("mongoose")

// Root Route
router.get("/", (req, res) => {
    res.render('index', { title: "Home" })
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