const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authenticateToken = require("../middleware/auth");

router.use(authenticateToken);

// Add product to cart
router.post("/add", authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!cart) {
      cart = new Cart({ user: req.user.id, products: [] });
    }

    const existingProduct = cart.products.find((p) =>
      p.product.equals(productId)
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's cart
router.get("/", authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/remove", authenticateToken, async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the product in the cart
    const productIndex = cart.products.findIndex((p) =>
      p.product.equals(productId)
    );

    if (productIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/update", async (req, res) => {
  console.log("Update route hit"); // Add this log
  const { productId, quantity } = req.body;

  try {
    console.log(req.user._id);
    const cart = await Cart.findOne({ user: req.user._id }); // Assuming user-based carts

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (itemIndex !== -1) {
      // Ensure the quantity is updated only if the product is found
      cart.products[itemIndex].quantity = quantity;
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // If the product isn't in the cart, return an error
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
