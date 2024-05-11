const Cart = require('../models/cartSchema');

exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  try {
    let cartItem = await Cart.findOne({ productId });
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItem = new Cart({ productId });
    }
    await cartItem.save();
    res.status(200).json({message:"Prouct add the card" ,user:cartItem})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCartItems = async (req, res) => {
  try {
    // const cartItems = await Cart.find().populate('productId');
    const cartItems = await Cart.find()
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
   
    const deletedCartItem = await Cart.findOneAndDelete({ productId });

    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json({ message: "Cart item removed", cartItem: deletedCartItem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to delete the cart item", error });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  try {
    const cartItem = await Cart.findOne({ productId });
    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
