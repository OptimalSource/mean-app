const exp = require("express")
const userApp = exp.Router()
const { getUsers, getUserByUsername, login, createUser } = require("../controllers/usercontroller")
const { getProduct, getProductByName, addProduct, updateProduct, deleteProduct } = require("../controllers/productController")

const verifyToken = require("../middleware/verifyToken");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

require("dotenv").config()



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,

})

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'demo',
        //format: async (req, file) =>'png'
        public_id: (req, file) => file.fieldname + '-' + Date.now(),
    }
})

//configure multer
const upload = multer({ Storage: cloudStorage })

// let users =[]

// //create middleware

// const middleware1 = (req ,res, next) =>{
//     console.log("middleware 1 executed")
//     // res.send({msg:"middleware 1 executed"})
//     next()
// }
// //make middle-ware 1 to executed for every request
// userApp.use(middleware1)


//create middleware

// const middleware2 = (req ,res, next) =>{
//     console.log("middleware 2 executed")
//     // res.send({msg:"middleware 2 executed"})
//     next()
// }



//get users
userApp.get('/get-users', getUsers)


//get user by username
userApp.get('/get-users/:username', verifyToken, getUserByUsername)

userApp.get('')

//create user 

userApp.post('/create-user', upload.single('profilePic'), createUser)

//login handler

userApp.post('/login', login)

//update user
userApp.put('/update-user', (req, res) => {
    let modifiedUserObj = req.body
    let indexOfUser = modifiedUserObj.findIndex((ele) => userObj.id === ele.id)
    if (indexOfUser === -1) {
        res.send({ msg: "error occured" })
    } else {
        res.send({ message: userObj })
    }
})

//delete User



userApp.get('/get-products', getProduct)


userApp.get('/get-product/:productname', getProductByName)

userApp.post('/add-product', addProduct)

userApp.put('/update-product', updateProduct)


userApp.delete('/delete-product/:productName', deleteProduct)
//export userApp object
module.exports = userApp