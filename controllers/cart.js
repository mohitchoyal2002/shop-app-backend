import cartModel from "../models/CartModel.js"

export const addToCart = async(req, res)=>{
  const { email, product } = req.body;

  try {
    // Find the cart for the given email
    let cart = await cartModel.findOne({ email });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new cartModel({
        email,
        cart: []
      });
    }

    cart.cart.push(product);

    await cart.save();

    res.status(200).json({ success: true, message: 'Product added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

export const fetchCart = async(req, res)=>{
  const email = req.params.email
  try{
    const data = await cartModel.findOne({email})
    res.json(data)
  }
  catch(err){
    // console.log(err);
    res.status(500).json("Somthing went Wrong Error: "+err)
  }
}