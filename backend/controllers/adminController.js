const jwt = require("jsonwebtoken")
require("dotenv").config()

const adminLogin = (req,res) =>{
    const adminCred = req.body

    if(adminCred.username !== "admin"){
        res.send({message:"invalid username"})
    }else if(adminCred.password !== "admin"){
        res.send({message:"invalid password"})
    }else{
        
        let signedToken = jwt.sign({username:admin},process.env.SECRET,{expiresIn:100})

        res.send({message:"success",token:signedToken,admin:adminCred})
    }
}

module.exports = adminLogin