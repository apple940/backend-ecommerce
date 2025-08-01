const jwt = require('jsonwebtoken');


const authMiddleware = async(req,res,next)=>{
    try{
        const authorization = req.headers.authorization
        if(!authorization || !authorization.startsWith('Bearer ')){
            return res.status(401).json({message: 'Unauthorized access'});
        }
        console.log("authorization : ",authorization)
        const token = authorization.split(" ")[1]
        console.log("token : ",token)
        if(!token){
            return res.status(401).json({message: 'Invalid Token and unauthorized access'});
        }

        const data = jwt.verify(token,process.env.JWT_SECRET);
        req.user = data
        next()
    }
    catch(error){
        console.error('Error in authMiddleware:', error);
        res.status(401).json({message: 'Unauthorized access'});
    }
}


module.exports = authMiddleware;