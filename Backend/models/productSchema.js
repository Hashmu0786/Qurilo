const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
