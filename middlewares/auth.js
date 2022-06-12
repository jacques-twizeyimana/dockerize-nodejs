const { verify } = require("jsonwebtoken")


exports.auth = (req,res,next)=>{
    try {
        req.user = verify(req.header('Authorization')?.split(' ')[1] || "",process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send("Unauthorized")
    }
}