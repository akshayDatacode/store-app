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

const initialState = {
  product: [],
  editProduct: [],
  error: null,
  isEdit: false,
  cart: [],
  cartCount: 0,
  totalPriceValue: 0,
  show: false,
  showlogin: false,
  isAuthorize: false,
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
        error: null,
      };
    case EDIT_PRODUCT:
      console.log(action.payload);
      return {
        ...state,
        editProduct: action.payload,
        isEdit: true,
        error: null,
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        isEdit: false,
        error: null,
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case ADD_TO_CART:
      const cart = [...state.cart];
      const cartCount = cart.length + 1;
      return {
        ...state,
        error: null,
        cartCount: cartCount,
      };

    case ASCENDING_FILTER:
      const productRef = [...state.product];
      const az = productRef.sort((a, b) => (a.title > b.title ? 1 : -1));
      return {
        ...state,
        product: az,
      };

    case DESCENDING_FILTER:
      const descendingRef = [...state.product];
      const za = descendingRef.sort((a, b) => (a.title < b.title ? 1 : -1));
      return {
        ...state,
        product: za,
      };

    case PRICR_HIGH_TO_LOW:
      const highToLowRef = [...state.product];
      const highToLow = highToLowRef.sort((a, b) =>
        a.price < b.price ? 1 : -1
      );
      return {
        ...state,
        product: highToLow,
      };

    case PRICR_LOW_TO_HIGH:
      const LowToHighRef = [...state.product];
      const LowToHigh = LowToHighRef.sort((a, b) =>
        a.price > b.price ? 1 : -1
      );
      return {
        ...state,
        product: LowToHigh,
      };

    case TOTAL_PRICE:
      const cartRefTotal = [...state.cart];
      const productTotalRef = [...state.product];
      var totalPrice = 0;
      cartRefTotal.map((e) => {
        productTotalRef.forEach((item) => {
          if (item._id === e.productId) {
            totalPrice =
              totalPrice +
              item.userQuantity * (item.price * (1 - item.discount / 100));
          }
        });
      });

      console.log(totalPrice);
      return {
        ...state,
        totalPriceValue: totalPrice,
      };

    case INCREASE_QUNTITY:
      const productQuantityRef = [...state.product];
      productQuantityRef.push(
        productQuantityRef.filter((item) => {
          if (item._id == action.payload.item._id) {
            if (item.quantity > 0) {
              item.quantity =
                item.quantity - action.payload.userQuantity.userQuantity;
              item.userQuantity = action.payload.userQuantity.userQuantity;
            }
          }
        })
      );
      return {
        ...state,
        product: productQuantityRef,
      };
    case DECREASE_QUNTITY:
      const productQuantityDecreaseRef = [...state.product];

      productQuantityDecreaseRef.push(
        productQuantityDecreaseRef.filter((item) => {
          if (item._id === action.payload._id) {
            if (item.quantity >= 0 && item.userQuantity != 0) {
              item.userQuantity -= 1;
              item.quantity += 1;
            }
          }
        })
      );
      return {
        ...state,
        product: productQuantityDecreaseRef,
      };

    case UPDATE_QUANTITY_IN_STORE:
      const productQuantityUpdateRef = [...state.product];
      const cartQuantityUpdateRef = [...state.cart];
      productQuantityUpdateRef.push(
        productQuantityUpdateRef.filter((item) => {
          cartQuantityUpdateRef.map((e) => {
            if (item._id == e.productId) {
              item.userQuantity = e.userQuantity;
              item.quantity = item.quantity - e.userQuantity;
            }
          });
        })
      );
      return {
        ...state,
        product: productQuantityUpdateRef,
      };

    case GET_CART:
      console.log(action.payload);
      return {
        ...state,
        cart: action.payload,
        cartCount: action.payload.length,
      };

    case SIGNUP_USER:
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
      return {
        ...state,
        error: null,
        user: action.payload,
      };

    case LOGIN_USER:
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
      return {
        ...state,
        error: null,
        user: action.payload,
      };

    case LOGOUT_USER:
      localStorage.clear();
      return {
        ...state,
        user: null,
      };

    case SIGNUP_MODAL:
      return {
        ...state,
        show: true,
        showlogin: false,
      };

    case LOGIN_MODAL:
      return {
        ...state,
        show: false,
        showlogin: true,
      };
    case SIGNUP_MODAL_CLOSE:
      return {
        ...state,
        show: false,
        showlogin: false,
      };

    case RESUME_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default reducer;
