const Product = require("../models/Product");



exports.addProducts = async(req,res)=>{
    try {
        const {name,brand,description,price,stockQuantity} = req.body

        const existingProduct = await Product.findOne({name})
        if(existingProduct){
            return res.status(400).json({
                message: "Product already exists",
                success: false});
        }

        const newProducts = new Product({
            name,
            brand,
            description,
            price,
            stockQuantity,
            uploadedBy: req.user.id // Assuming req.user is set by an authentication middleware
        })

        await newProducts.save()
        res.status(201).json({
            message: "Product added successfully",
            success: true,
            data: newProducts
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
        
    }
}


exports.getProducts = async(req,res)=>{
    try {
        const product = await Product.find().sort({createdAt:-1})

        if(!product || product.length === 0){
            return res.status(404).json({message: "No products found"});
        }
        res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products: product
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
        
    }
}

exports.deleteProduct = async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
        
    }
}

exports.updateProduct = async(req,res)=>{
    try {
        const productid = req.params.id
        const {name, brand , description, price, stockQuantity} = req.body
        const findProduct = await Product.findOne({_id: productid})
        if(!findProduct){
            return res.status(404).json({message: "Product not found"});
        }

        const updateFields = {}
        if (name) updateFields.name = name;
        if (brand) updateFields.brand = brand;
        if (description) updateFields.description = description;
        if (price) updateFields.price = price;
        if (stockQuantity) updateFields.stockQuantity = stockQuantity;

        const updateProduct = await Product.findByIdAndUpdate(
            productid,
            {
                $set: updateFields
            },
            {
                new: true, // Return the updated document
                runValidators: true // Validate the update against the schema
            }
        )
        if(!updateProduct){
            return res.status(404).json({message: "Product id is not correct"});
        }
        res.status(200).json({
            message: "Product updated successfully",
            success: true,
            data: updateProduct
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
        
    }
}