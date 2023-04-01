const express = require("express")
const router = express.Router()
const Product = require("../models/productModel")
const mongoose = require("mongoose")
const multer = require('multer')
const fs = require("fs")

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
        console.log(`product added successfully`)
        res.redirect("/")

    } catch (error) {
        res.json({message: error.message, type: 'danger'})
        console.log(error)
    }
})

//Update Product

router.get("/edit/:id", async(req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
            if(product == null){
                console.log("No product was found")
            }else{
                res.render("editProduct", {
                    title: 'Edit Product',
                    product: product
                })
            }
        


    } catch (error) {
        res.json({message: error.message})
        console.log(error)
    }
})

router.post("/update/:id", upload, async(req, res) => {
    let id = req.params.id
    let newImage = ''

    if(req.file){
        newImage = req.file.filename
        try {
            fs.unlinkSync('./uploads/'+req.body.old_image)
            
        } catch (error) {
            console.log(error)
        }
    }else{
        newImage = req.body.old_image
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        image: newImage,
    })
    if(!updatedProduct){
        console.log("something wrong with update")
    }else{
        res.redirect("/")
        console.log('Updated successful')
    }
})

//Delete Product
// router.get("/delete/:id", async(req, res) => {
//     const id = req.params.id
//     const trashedProduct = await Product.findByIdAndDelete(id)
//     if(trashedProduct.image != ''){
//         try {
//             fs.unlinkSync(`./uploads/`+trashedProduct.image)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     try {
//         res.redirect("/")
//         console.log("Product Deleted Successfully")
//     } catch (error) {
//         res.json({message: error.message})
//         console.log(error)
//     }
// })


// Root Route
router.get("/", async(req, res) => {
    try{
        const products = await Product.find({})
        res.render('index', {
            title: 'Home page',
            products: products
        })

    }catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
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