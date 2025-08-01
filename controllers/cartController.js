const Product = require("../models/Product");
const User = require("../models/user");

  exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const {productId,quantity} = req.body
        if (!productId) {
            return res.status(400).json({message: 'Product ID required'});
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        const existingItem = user.cart.find(item => item.product._id.toString()=== productId)
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({product: productId, quantity});
        }

        await user.save();
        const updateduser = await User.findById(userId).populate('cart.product');
        res.status(200).json({
            message: 'Product added to cart successfully',
            updateduser
        });



    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
        
    }
  }



  exports.getCart = async(req,res)=>{
    const userId = req.user.id
    try {
        const user = await User.findById(userId).populate('cart.product');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        if (user.cart.length === 0) {
            return res.status(404).json({message: 'Cart is empty'});
        }
        res.status(200).json({
            message: 'Cart fetched successfully',
            cart: user.cart
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
        
    }
  }

  exports.removeFromCart = async(req,res)=>{
    try {
        const userId = req.user.id;
        const {productId} = req.body;
        if (!productId) {
            return res.status(400).json({message: 'Product ID required'});
        }
        const user = await  User.findById(userId)
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        user.cart = user.cart.filter(item => item.product._id.toString() !== productId)
        await user.save();
        const updateduser = await User.findById(userId).populate('cart.product');   
        res.status(200).json({
            message: 'Product removed from cart successfully',
            updateduser
        });

    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
        
    }
  }