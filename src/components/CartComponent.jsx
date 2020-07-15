import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  totalPrice,
  updateQuntity,
  decreaseQuntity,
  deleteCartProduct,
  getProductsFromCart,
  updateProduct,
  getProducts,
} from "../redux/product/productAction";

class CartComponent extends Component {
  componentDidMount() {
    this.timer = setInterval(() => this.props.getProductsFromCart(), 500);
    this.timer2 = setInterval(() => this.props.getProducts(), 500);
    this.timer3 = setInterval(() => this.props.totalPrice(), 500);
  }

  componentWillUnmount() {
    clearTimeout(setTimeout(this.props.getProductsFromCart(), 500));
    clearInterval(this.timer);
    this.timer = null;
    clearTimeout(setTimeout(this.props.getProducts(), 500));
    clearInterval(this.timer2);
    this.timer2 = null;
    clearTimeout(setTimeout(this.props.getProducts(), 500));
    clearInterval(this.timer3);
    this.timer3 = null;
  }

  increaseQuntity = (item) => {
    this.props.getProductsFromCart();
    var userQuantity = 0;
    console.log("Inside Increase Function");
    this.props.cart.forEach((element) => {
      if (item._id == element.productId) {
        {
          userQuantity = element.userQuantity + 1;

          this.props.updateQuntity(element._id, { userQuantity }, item);
          this.props.updateProduct({ userQuantity }, item._id);
          console.log(userQuantity, element._id);
        }
      }
    });
  };

  decreaseQuntity = (item) => {
    this.props.getProductsFromCart();
    var userQuantity = 0;
    console.log("Inside Increase Function");
    this.props.cart.forEach((element) => {
      if (item._id == element.productId) {
        {
          userQuantity = element.userQuantity - 1;

          this.props.updateQuntity(element._id, { userQuantity }, item);
          this.props.updateProduct({ userQuantity }, item._id);
          console.log(userQuantity, element._id);
        }
      }
    });
  };

  deleteCartProduct = (item) => {
    this.props.getProductsFromCart();
    var userQuantity = 0;
    console.log("Inside Increase Function");
    this.props.cart.forEach((element) => {
      if (item._id == element.productId) {
        {
          userQuantity = 0;

          this.props.updateQuntity(element._id, { userQuantity }, item);
          this.props.updateProduct({ userQuantity }, item._id);
          this.props.deleteCartProduct(item._id);
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
                              className="btn btn-default"
                              onClick={() => this.deleteCartProduct(item)}
                            >
                              [X]
                            </button>
                          </div>
                        </div>

                        <h6 className="text-back"> Price :{item.price} /-</h6>

                        <p>Quantity : {item.quantity}</p>
                        <b className="text-secondary">
                          Discount : {item.discount} %
                        </b>
                        <br />

                        <div className="row">
                          <div className="col-6">
                            <h5 className="text-success">
                              Net Price :{" "}
                              {item.price * (1 - item.discount / 100)} /-
                            </h5>
                          </div>

                          <div className="col-6 ">
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
                                <div className="row">
                                  {item.userQuantity > 0 && (
                                    <div
                                      className="btn  mr-2 btn-sm"
                                      onClick={() => this.decreaseQuntity(item)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faMinus}
                                        color="red"
                                      />
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
                                      <FontAwesomeIcon
                                        icon={faPlus}
                                        color="green"
                                      />
                                    </div>
                                  )}
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
  };
};
const mapDispatchToProps = {
  totalPrice,
  updateQuntity,
  decreaseQuntity,
  deleteCartProduct,
  getProductsFromCart,
  updateProduct,
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
