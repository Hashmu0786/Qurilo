const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("./Config/mongoose")
const cors = require('cors')
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart");
// const dotenv = require('dotenv').config();
const port =  5000;
const app = express();

 app.use(cors());
 app.use(express.json());
 app.use(bodyParser.urlencoded({extended:true}))
 app.use('/uploads', express.static('uploads'));


 app.use('/product',productRoute);
 app.use('/cart',cartRoute);


app.listen(port,()=>{
   try {
    console.log(`Server is Running on port ${port}`);
   } catch (error) {
    console.log(error)
   }
})