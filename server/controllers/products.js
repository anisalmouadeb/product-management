import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(201).json({ products });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(201).json({ product });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  console.log(req.body);
  const product = req.body;

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(_id, product, {
      new: true,
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndRemove(id);
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
