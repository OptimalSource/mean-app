// const { application } = require("express")
const exp = require("express");
const path= require("path")
 // env module

require("dotenv").config()
const app = exp();


app.use(exp.static(path.join(__dirname,'./dist/mean-app')))
const mongoClient = require("mongodb").MongoClient;
const dbURL = process.env.DBURL

mongoClient.connect(dbURL)
.then((client)=>{
    let databaseObject =client.db("myDB");

    let userCollectionObject= databaseObject.collection("usercollection");
    let productCollectionObject = databaseObject.collection("productcollection");
    app.set("userCollectionObject", userCollectionObject)
    app.set("productCollectionObject",productCollectionObject)
})
.catch((err)=> console.log("err in connecting database",err))


const userApp = require("./backend/APIs/usersApi")
const adminApp = require("./backend/APIs/adminAPI")
//add body parser middleware
app.use(exp.json())
//app.use(exp.multipart())
app.use(exp.urlencoded())

//if path is users,then execute users api
app.use('/user',userApp)
app.use('/product',userApp)
app.use('/admin',adminApp)

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/mean-app/index.html'), err=> {
        if (err) {
           next(err)
        }
    })
})

//handling invalid path
app.use((req,res,next)=>{
    res.status(200).send({message:`the path ${req.url} does not exist`})
})

app.use((err,req,res,next) => {
    res.send({message:err.message})
})

let PORT = 4000 || process.env.PORT;
app.listen(PORT, console.log(`HTTP port listening to ${PORT}`))