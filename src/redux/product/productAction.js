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
  ASCENDING_FILTER,
  DESCENDING_FILTER,
  PRICR_HIGH_TO_LOW,
  PRICR_LOW_TO_HIGH,
  TOTAL_PRICE,
} from "./type";

import axios from "axios";

const add_product = "http://www.localhost:5000/api/add_product";
const get_products = "http://www.localhost:5000/api/get_products";

export const getProducts = () => {
  console.log("GetUsers");

  return (dispatch) => {
    console.log("GetUsers dispatch");

    axios
      .get(get_products)
      .then((res) => {
        const product = res.data.product;
        console.log("Aaction Get  ", product);
        dispatch({
          type: GET_PRODUCTS,
          payload: res.data.product,
        });
      })
      .catch((err) => {
        console.log("Aaction Get Aeeror ", err);
        dispatch({
          type: GET_PRODUCTS_FAILURE,
          payload: {
            ...err,
          },
        });
      });
  };
};

export const addProductDetails = (product) => {
  return (dispatch) => {
    dispatch(addProductStarted());

    axios
      .post(add_product, product)
      .then((res) => {
        dispatch(addProductSuccess(res.data));
      })
      .catch((err) => {
        dispatch(addProductFailure(err.message));
      });
  };
};

export const editProduct = (editProduct) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_PRODUCT,
      payload: editProduct,
    });
  };
};

export const updateProduct = (product, id) => {
  return (dispatch) => {
    console.log("GetUsers dispatch");

    axios
      .put(`http://www.localhost:5000/api/edit_product/${id}`, product)
      .then((res) => {
        console.log(" Edit status", res.data);
        dispatch({
          type: UPDATE_PRODUCT,
          payload: { isEdit: false },
        });
      })
      .catch((err) => {
        console.log("Aaction Get Aeeror ", err);
        dispatch({
          type: UPDATE_PRODUCT_FAILURE,
          payload: {
            ...err,
          },
        });
      });
  };
};

export const addToCart = (cartRef) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: cartRef,
    });
  };
};

export const ascendingFilter = () => {
  return (dispatch) => {
    dispatch({
      type: ASCENDING_FILTER,
    });
  };
};

export const descendingFilter = () => {
  return (dispatch) => {
    dispatch({
      type: DESCENDING_FILTER,
    });
  };
};

export const priceLowToHighFilter = () => {
  return (dispatch) => {
    dispatch({
      type: PRICR_LOW_TO_HIGH,
    });
  };
};

export const priceHighToLowFilter = () => {
  return (dispatch) => {
    dispatch({
      type: PRICR_HIGH_TO_LOW,
    });
  };
};

export const totalPrice = () => {
  return (dispatch) => {
    dispatch({
      type: TOTAL_PRICE,
    });
  };
};

const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: {
    ...product,
  },
});

const addProductStarted = () => ({
  type: ADD_PRODUCT_STARTED,
});

const addProductFailure = (error) => ({
  type: ADD_PRODUCT_FAILURE,
  payload: {
    error,
  },
});
