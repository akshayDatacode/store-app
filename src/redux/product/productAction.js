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
  INCREASE_QUNTITY,
  GET_CART,
  UPDATE_CART,
  DELETE_CART_PRODUCT,
  UPDATE_QUANTITY_IN_STORE,
  SIGNUP_USER,
  LOGIN_USER,
  SIGNUP_MODAL,
  SIGNUP_MODAL_CLOSE,
  LOGIN_MODAL,
  LOGOUT_USER,
  ERROR,
  RESUME_USER,
} from "./type";

import axios from "axios";

const api = `http://www.localhost:5000/api/`;

export const getProducts = () => {
  return (dispatch) => {
    return axios
      .get(`${api}get_products`)
      .then((res) => {
        const product = res.data.product;
        dispatch({
          type: GET_PRODUCTS,
          payload: res.data.product,
        });
      })

      .catch((err) => {
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
    return axios
      .post(`${api}add_product`, product)
      .then((res) => {
        dispatch(addProductSuccess(res.data));
        return { success: true };
      })
      .catch((err) => {
        dispatch(addProductFailure(err.message));
        return { success: false };
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
    return axios
      .put(`${api}edit_product/${id}`, product)
      .then((res) => {
        dispatch({
          type: UPDATE_PRODUCT,
          payload: { isEdit: false },
        });
        return { success: true };
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_PRODUCT_FAILURE,
          payload: {
            ...err,
          },
        });
        return { success: false };
      });
  };
};

// Cart Actions

export const addToCart = (productId) => {
  return (dispatch) => {
    axios
      .post(`${api}cart/add_cart`, { productId })
      .then((res) => {
        dispatch({
          type: ADD_TO_CART,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_PRODUCT_FAILURE,
          payload: {
            ...err,
          },
        });
      });
  };
};

export const getProductsFromCart = () => {
  return (dispatch) => {
    axios
      .get(`${api}cart/get_cart`)
      .then((res) => {
        const cart = res.data.cart;

        dispatch({
          type: GET_CART,
          payload: res.data.cart,
        });
        setTimeout(getProductsFromCart, 1000);
      })
      .catch((err) => {
        dispatch({
          type: GET_PRODUCTS_FAILURE,
          payload: {
            ...err,
          },
        });
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

export const updateQuntity = (id, userQuantity, item) => {
  return (dispatch) => {
    return axios
      .put(`http://www.localhost:5000/api/cart/edit_cart/${id}`, userQuantity)
      .then((res) => {
        dispatch({
          type: INCREASE_QUNTITY,
          payload: { item, userQuantity },
        });
        return { success: true };
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_PRODUCT_FAILURE,
          payload: {
            ...err,
          },
        });
        return { success: false };
      });
  };
};

export const deleteCartProduct = (id) => {
  return (dispatch) => {
    return axios
      .delete(`http://www.localhost:5000/api/cart/delete_cart_product/${id}`)
      .then((res) => {
        dispatch({
          type: DELETE_CART_PRODUCT,
          payload: id,
        });
        return { success: true };
      })

      .catch((err) => {
        dispatch({
          type: UPDATE_PRODUCT_FAILURE,
          payload: {
            ...err,
          },
        });
        return { success: true };
      });
  };
};

export const resumeUser = (parseDataFromJSON) => {
  return (dispatch) => {
    dispatch({
      type: RESUME_USER,
      payload: parseDataFromJSON,
    });
  };
};

export const signupUser = (user) => {
  debugger;
  return (dispatch) => {
    axios
      .post(`http://www.localhost:5000/api/user/signup`, user)
      .then((res) => {
        dispatch({
          type: SIGNUP_USER,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_PRODUCT_FAILURE,
          payload: {
            ...err,
          },
        });
      });
  };
};

export const loginUser = (user) => {
  return (dispatch) => {
    axios
      .post(`http://www.localhost:5000/api/user/login`, user)
      .then((res) => {
        dispatch({
          type: LOGIN_USER,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("Aaction Get error ", err.message);
      });
  };
};

export const handleSignup = () => {
  return (dispatch) => {
    dispatch({
      type: SIGNUP_MODAL,
    });
  };
};

export const handleLogin = () => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_MODAL,
    });
  };
};

export const handleClose = () => {
  return (dispatch) => {
    dispatch({
      type: SIGNUP_MODAL_CLOSE,
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER,
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
