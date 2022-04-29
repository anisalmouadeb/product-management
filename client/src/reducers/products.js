import {
  FETCH_ALL,
  CREATE,
  FETCH_PRODUCT,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
} from "../constants/products";

let initialState = {
  products: [],
  isLoading: true,
  product: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        products: action.payload.products,
      };
    case FETCH_PRODUCT:
      return { ...state, product: action.payload };
    case CREATE:
      return { ...state, products: [...state, action.payload] };
    case DELETE:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    case UPDATE:
      return {
        ...state,
        products: state.products.map((acc) =>
          acc._id === action.payload._id ? action.payload : acc
        ),
      };

    default:
      return state;
  }
};
