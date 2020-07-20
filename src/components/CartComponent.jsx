import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  totalPrice,
  updateQuntity,
  deleteCartProduct,
  getProductsFromCart,
  updateProduct,
  getProducts,
  handleSignup,
} from "../redux/product/productAction";

class CartComponent extends Component {
  componentDidMount() {
    const {
      props: {
        user,
        getProducts,
        getProductsFromCart,
        totalPrice,
        handleSignup,
      },
    } = this;

    if (user != null) {
      getProductsFromCart();
      getProducts();
      totalPrice();
    } else {
      handleSignup();
    }
  }

  increaseQuntity = (item) => {
    const {
      props: {
        cart,
        updateProduct,
        updateQuntity,
        getProducts,
        getProductsFromCart,
      },
    } = this;

    var userQuantity = 0;
    cart.forEach((element) => {
      if (item._id == element.productId) {
        {
          userQuantity = element.userQuantity + 1;

          updateQuntity(element._id, { userQuantity }, item).then((res) => {
            if (res.success) {
              getProducts();
            }
          });

          updateProduct({ userQuantity }, item._id).then((res) => {
            if (res.success) {
              getProductsFromCart();
            }
          });
          console.log(userQuantity, element._id);
        }
      }
    });
  };

  decreaseQuntity = (item) => {
    const {
      props: {
        cart,
        updateProduct,
        updateQuntity,
        getProducts,
        getProductsFromCart,
      },
    } = this;

    var userQuantity = 0;
    cart.find((element) => {
      if (item._id == element.productId) {
        {
          userQuantity = element.userQuantity - 1;

          updateQuntity(element._id, { userQuantity }, item).then((res) => {
            if (res.success) {
              getProducts();
            }
          });

          updateProduct({ userQuantity }, item._id).then((res) => {
            if (res.success) {
              getProductsFromCart();
            }
          });
          console.log(userQuantity, element._id);
        }
      }
    });
  };

  deleteCartProduct = (item) => {
    const {
      props: {
        cart,
        updateProduct,
        updateQuntity,
        deleteCartProduct,
        getProductsFromCart,
      },
    } = this;

    var userQuantity = 0;
    cart.find((element) => {
      if (item._id == element.productId) {
        {
          userQuantity = 0;

          updateQuntity(element._id, { userQuantity }, item);
          updateProduct({ userQuantity }, item._id);
          deleteCartProduct(item._id).then((res) => {
            if (res.success) {
              getProductsFromCart();
            }
          });
          console.log(userQuantity, element._id);
        }
      }
    });
  };

  render() {
    return (
      <>
        <div className="row ">
          <div className="col-3"></div>
          <div className="col-6 border border-dark mt-4">
            <h1 className="text-center text-primary mt-2  ">Cart Billing</h1>

            {this.props.cart.map((element) =>
              this.props.product.map((item) => {
                if (item._id == element.productId) {
                  return (
                    <div className="card mb-3 shadow-lg border">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <h6 className="text-primary text-weight-bold">
                              <b>{item.title}</b>
                            </h6>
                          </div>
                          <div className="col-6 text-right">
                            <button
                              className="btn btn-danger"
                              onClick={() => this.deleteCartProduct(item)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        <h6 className="text-back"> Price :{item.price} /-</h6>

                        <b className="text-secondary">
                          Discount : {item.discount} %
                        </b>
                        <br />

                        <div className="row">
                          <div className="col-4">
                            <h5 className="text-success">
                              Net Price :{" "}
                              {item.price * (1 - item.discount / 100)} /-
                            </h5>
                          </div>
                          <div className="col-4 text-center">
                            {item.userQuantity > 0 && (
                              <div
                                className="btn  mr-2 btn-sm"
                                onClick={() => this.decreaseQuntity(item)}
                              >
                                <FontAwesomeIcon icon={faMinus} color="red" />
                              </div>
                            )}
                            <div className="badge badge-primary">
                              {item.userQuantity}
                            </div>
                            {item.quantity - item.userQuantity != 0 && (
                              <div
                                className="btn  ml-2 btn-sm"
                                onClick={() => this.increaseQuntity(item)}
                              >
                                <FontAwesomeIcon icon={faPlus} color="green" />
                              </div>
                            )}
                          </div>

                          <div className="col-4 ">
                            <div className="row ">
                              <div className="col">
                                <div className="row">
                                  <div className="col text-right">
                                    <p className="badge badge-primary ">
                                      Total Quantity : {item.userQuantity}
                                    </p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <h6 className="text-dark  text-right">
                                      Total Price :
                                      {item.userQuantity *
                                        (item.price *
                                          (1 - item.discount / 100))}
                                      /-
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            )}
            {this.props.cart.length > 0 && (
              <div className="row border border-dark">
                <div className="col">
                  <h3 className="text-primary text-right">
                    Total Price : {this.props.totalPriceValue}
                  </h3>
                </div>
              </div>
            )}
          </div>
          <div className="col-3"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    totalPriceValue: state.totalPriceValue,
    product: state.product,
    user: state.user,
  };
};
const mapDispatchToProps = {
  totalPrice,
  updateQuntity,
  deleteCartProduct,
  getProductsFromCart,
  updateProduct,
  getProducts,
  handleSignup,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
