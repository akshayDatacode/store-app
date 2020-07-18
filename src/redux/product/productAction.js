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
  DECREASE_QUNTITY,
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

const add_product = "http://www.localhost:5000/api/add_product";
const get_products = "http://www.localhost:5000/api/get_products";
const add_cart = "http://www.localhost:5000/api/cart/add_cart";
const get_cart = "http://www.localhost:5000/api/cart/get_cart";

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

// Cart Actions

export const addToCart = (productId) => {
  console.log("Cart Item", productId);

  return (dispatch) => {
    console.log("Cart dispatch");

    axios
      .post(add_cart, { productId })
      .then((res) => {
        console.log("Add Status", res.data);
        dispatch({
          type: ADD_TO_CART,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("Aaction Get error ", err);
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
  console.log("GetCART");

  return (dispatch) => {
    console.log("GetCARTs dispatch");

    axios
      .get(get_cart)
      .then((res) => {
        const cart = res.data.cart;
        console.log("Aaction Get  ", cart);
        dispatch({
          type: GET_CART,
          payload: res.data.cart,
        });
        setTimeout(getProductsFromCart, 1000);
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

export const decreaseQuntity = (item) => {
  return (dispatch) => {
    dispatch({
      type: DECREASE_QUNTITY,
      payload: item,
    });
  };
};

// export const increaseQuntity = (item) => {
//   return (dispatch) => {
//     dispatch({
//       type: INCREASE_QUNTITY,
//       payload: item,
//     });
//   };
// };

export const updateQuntity = (id, userQuantity, item) => {
  return (dispatch) => {
    console.log("GetUsers dispatch EDIT CART", userQuantity);

    axios
      .put(`http://www.localhost:5000/api/cart/edit_cart/${id}`, userQuantity)
      .then((res) => {
        console.log(" Edit status EDIT CART", res.data);
        dispatch({
          type: INCREASE_QUNTITY,
          payload: item,
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

export const deleteCartProduct = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://www.localhost:5000/api/cart/delete_cart_product/${id}`)
      .then((res) => {
        console.log("CART PRODUCT DELETED", res.data);
        dispatch({
          type: DELETE_CART_PRODUCT,
          payload: id,
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

export const resumeUser = (parseDataFromJSON) => {
  return (dispatch) => {
    dispatch({
      type: RESUME_USER,
      payload: parseDataFromJSON,
    });
  };
};

export const signupUser = (user) => {
  console.log("user Info", user);
  debugger;
  return (dispatch) => {
    console.log("user dispatch");

    axios
      .post(`http://www.localhost:5000/api/user/signup`, user)
      .then((res) => {
        console.log("Add Status", res.data);
        dispatch({
          type: SIGNUP_USER,
          payload: res.data,
        });
        return { success: false };
      })
      .catch((err) => {
        console.log("Aaction Get error ", err);
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
  console.log("user Info", user);
  debugger;
  return (dispatch) => {
    console.log("user dispatch");

    axios
      .post(`http://www.localhost:5000/api/user/login`, user)
      .then((res) => {
        console.log("Login Status", res.data);
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
