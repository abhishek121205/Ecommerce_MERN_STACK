const jwt = require("jsonwebtoken");

const authToken = async(req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            throw new Error("User is not logged in")
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if(!err){
                req.userId = decoded._id;
                next()            
            }
        });
        
    } catch (error) {
        res.status(200).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = { authToken }