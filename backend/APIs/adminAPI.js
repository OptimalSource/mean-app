const exp = require("express");
const adminApp = exp.Router();

const adminLogin = require("../controllers/adminController")

//admin Login
adminApp.post("/login",adminLogin)


module.exports = adminApp