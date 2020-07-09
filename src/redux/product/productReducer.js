import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_STARTED,
  GET_PRODUCTS,
  GET_PRODUCTS_FAILURE,
  EDIT_PRODUCT,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT,
  ADD_TO_CART,
} from "./type";

const initialState = {
  product: [],
  editProduct: [],
  error: null,
  isEdit: false,
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_STARTED:
      return {
        ...state,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case ADD_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case GET_PRODUCTS:
      console.log(action.payload);
      return {
        ...state,
        product: action.payload,
      };
    case EDIT_PRODUCT:
      console.log(action.payload);
      return {
        ...state,
        editProduct: action.payload,
        isEdit: true,
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        isEdit: false,
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case ADD_TO_CART:
      const cartRef = [...state.cart];
      cartRef.push(action.payload);
      return {
        ...state,
        cart: cartRef,
      };

    default:
      return state;
  }
};
export default reducer;
