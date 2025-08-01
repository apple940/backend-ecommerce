const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); // Assuming you have an admin middleware

const router = express.Router()


router.get('/public',(req,res)=>{
    res.status(200).json({message: 'This is a public route'});
})

router.get('/private',authMiddleware, (req, res) => {
    res.status(200).json({ 
        message: 'This is a private route' ,
        status: 'success',
        user: req.user // Assuming req.user is set by authMiddleware
    });
});


router.get('/admin',authMiddleware,adminMiddleware,(req,res)=>{
    res.status(200).json({
        message: 'This is an admin route',
        status: 'success',
        user: req.user 
    })
})


module.exports = router;