import axios from "axios";

const url = "https://product-management-anis.herokuapp.com";

export const fetchProducts = () => axios.get(`${url}`);
export const fetchProduct = (id) => axios.get(`${url}/${id}`);
export const createProduct = (newProduct) => axios.post(`${url}`, newProduct);
export const deleteProduct = (id) => axios.delete(`${url}/${id}`);
export const updateProduct = (id, product) =>
  axios.patch(`${url}/${id}`, product);
