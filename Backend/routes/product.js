const express = require("express");

const routes = express.Router();

const user = require("../controllers/productController")
 
routes.get("/get",user.getAll);
routes.post("/addData",user.create);
routes.put("/edit/:id",user.edit);
routes.delete("/delete/:id",user.delete);

module.exports = routes