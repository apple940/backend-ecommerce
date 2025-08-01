const errorHandler = (err,req,res,next)=>{
    console.error("err.stack : ",err.stack)

    res.status(err.statusCode).json({
        status:"fail",
        message:err.message
    })
}


module.exports = errorHandler