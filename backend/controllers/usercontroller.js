const { use } = require("express/lib/router")
const expressErrorHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")

require("dotenv").config()


const getUsers = async (req, res) => {
    //get usercollection object from req
    let userCollectionObject = req.app.get("userCollectionObject")
    //get users data from usercollection and pack into array
    let users = await userCollectionObject.find().toArray()
    //send response
    res.send({ message: "list of users", payload: users })
}


const getUserByUsername = async (req, res) => {

    //get usercollection object from re

    let userCollectionObject = req.app.get("userCollectionObject")
    //get user id from url param id
    let userNameofUrl = req.params.username;

    let user = await userCollectionObject.findOne({ username: userNameofUrl })

    res.send({ message: "User Data", payload: user })
}

const createUser = expressErrorHandler(async (req, res) => {

    console.log(req.file.path)
    //get new user obj and convert it into object
    let userObj = JSON.parse(req.body.userObj)
    userObj.profilePic = req.file.path

    console.log("final user object", userObj)
    //get collection object form req
    let userCollectionObject = req.app.get("userCollectionObject")

    let userOfDB = await userCollectionObject.findOne({ username: userObj })
    if (userOfDB !== null) {
        res.status(200).send({ message: "User already exist" })
    } else {
        let hashPassword = await bcryptjs.hash(userObj.password, 5)
        userObj.password = hashPassword

        let result = await userCollectionObject.insertOne(userObj)

        res.status(201).send({ message: "User Created successfully" })

    }
})


const login = expressErrorHandler(async (req, res) => {
    //get usercollection object from req
    let userCollectionObject = req.app.get("userCollectionObject")
    //get user credentials
    let credentials = req.body
    //get user from database
    let userOfDB = await userCollectionObject.findOne({ username: credentials.username })
    console.log(userOfDB)

    //check user is exist or not
    if (userOfDB === null) {
        res.send({ message: "invalid user credentials" })
    } //if user exist ,compare password
    else {
        let status = await bcryptjs.compare(credentials.password, userOfDB.password)
        //if password not matched 
        if (status == false) {
            res.send({ message: "Invalid Password" })
        } else {
            let userToken = jwt.sign({ username: userOfDB.username }, process.env.SECRET, { expiresIn: "1h", })
            console.log(userToken)
            res.send({ message: "success", token: userToken, userObj: userOfDB })
        }
    }
})

module.exports = { getUsers, getUserByUsername, login, createUser }