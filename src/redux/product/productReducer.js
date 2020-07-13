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
} from "./type";

const initialState = {
  product: [],
  editProduct: [],
  error: null,
  isEdit: false,
  cart: [],
  cartCount: 0,
  totalPriceValue: 0,
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
      return {
        ...state,
        error: null,
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
      console.log("In Side Reducer");
      var totalPrice = 0;
      cartRefTotal.forEach((item) => {
        totalPrice =
          totalPrice +
          item.userQuantity * (item.price * (1 - item.discount / 100));
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
          if (item == action.payload) {
            if (item.quantity > 0) {
              item.userQuantity += 1;
              item.quantity -= 1;
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
          if (item == action.payload) {
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

    case GET_CART:
      console.log(action.payload);
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};
export default reducer;
