const mongoose = require("mongoose");
const Product = require("../models/Product");
const products = require("../data/products.json");

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.geiry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
    return Product.insertMany(products);
  })
  .then(() => {
    console.log("Products inserted");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
    mongoose.disconnect();
  });
