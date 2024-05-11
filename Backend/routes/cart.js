const express = require("express");

const routes = express.Router();

const cartController = require("../controllers/cartController")
 
routes.post('/add', cartController.addToCart);
routes.get('/get',cartController.getAllCartItems);
routes.delete('/remove/:productId', cartController.removeFromCart);
routes.put('/update/:id', cartController.updateCartItemQuantity);



module.exports = routes