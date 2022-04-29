import * as api from "../api/index.js";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_PRODUCT,
  START_LOADING,
  END_LOADING,
} from "../constants/products";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchProducts();

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchProduct(id);

    dispatch({ type: FETCH_PRODUCT, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    console.log(product);

    const { data } = await api.createProduct(product);

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deleteProduct(id);

    dispatch({ type: DELETE, payload: id });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    console.log({ product });
    const { data } = await api.updateProduct(id, product);

    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
