import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  nom: String,
  prix: Number,
  quantite: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
