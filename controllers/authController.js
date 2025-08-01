const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.signup = async(req,res)=>{
    try {
        const {username,password,email,role} = req.body;
        const existingUser = await User.findOne({username})

        if(existingUser){
            return res.status(400).json({message: 'Username already exists'});
        }
        

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({username,password: hashedPassword,email,role})
        await newUser.save()
        res.status(201).json({message: 'User created successfully'},{data: newUser});
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

exports.login = async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({message: 'Invalid username'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid password'});
        }

        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: '30m'}
        )
        res.status(200).json({
            message: 'Login successful',
            token:token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}