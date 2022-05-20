const expressErrorHandler = require("express-async-handler")

const getProduct = expressErrorHandler (async(req, res)=>{
    //get usercollection object from req
    let productCollectionObject = req.app.get("productCollectionObject")
    //get users data from usercollection and pack into array
    let products = await productCollectionObject.find().toArray()
    //send response
    res.send({message: "list of products", payload:products})
})

const getProductByName = expressErrorHandler( async (req,res)=>{
    let productCollectionObject = req.app.get("productCollectionObject")
    let productNameOfUrl = req.params.productname
    let product = await productCollectionObject.findOne({productname:productNameOfUrl})
    res.send({message:"product Data",payload:product})
})

const addProduct = expressErrorHandler( async (req, res)=>{
    let productCollectionObject = req.app.get("productCollectionObject")
    let productObj = req.body;
    let result = await productCollectionObject.insertOne(productObj)
    

    if (result.acknowledged == true) {
        res.send({message:"product added successfully", payload:result})
    } else {
        res.send({message:"Error occured"})
    }

    
})
const updateProduct = expressErrorHandler( async (req, res)=>{
    let productCollectionObject = req.app.get("productCollectionObject")
    let modifiedProductObj = req.body

    let result =await productCollectionObject.updateOne({productName:modifiedProductObj.productName},{$set:{...modifiedProductObj}})

    if (result.acknowledged == true) {
        res.send({message:"product modified successfully", payload:result})
    } else {
        res.send({message:"Error occured"})
    }
})

const deleteProduct = expressErrorHandler( async(req,res)=>{
    let productCollectionObject = req.app.get("productCollectionObject")
    let productNameOfUrl = req.params.productName

    let result =await productCollectionObject.deleteOne({productName:productNameOfUrl})
    res.send({message:"Dleted Successfully",payload:result})
})

module.exports={getProduct,getProductByName,addProduct,updateProduct,deleteProduct}