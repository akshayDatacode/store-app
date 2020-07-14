import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  totalPrice,
  increaseQuntity,
  decreaseQuntity,
  deleteCartProduct,
  getProductsFromCart,
} from "../redux/product/productAction";

class CartComponent extends Component {
  componentDidMount = () => {
    this.props.getProductsFromCart();
    this.props.totalPrice();
  };

  increaseQuntity = (item) => {
    this.props.getProductsFromCart();
    var updatedQuantity = 0;
    console.log("Inside Increase Function");
    this.props.cart.forEach((element) => {
      if (item._id == element.productId) {
        {
          updatedQuantity = element.userQuantity + 1;

          this.props.increaseQuntity(item._id, updatedQuantity, item);
          console.log(updatedQuantity, item);
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
                          <div className="col-6">
                            <button
                              className="btn btn-default"
                              onClick={() =>
                                this.props.deleteCartProduct(item._id)
                              }
                            >
                              X
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
                                  <div
                                    className="btn  mr-2 btn-sm"
                                    onClick={() =>
                                      this.props.decreaseQuntity(item)
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faMinus}
                                      color="red"
                                    />
                                  </div>

                                  <div className="badge badge-primary">
                                    {item.userQuantity}
                                  </div>
                                  {item.quantity != 0 && (
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
  increaseQuntity,
  decreaseQuntity,
  deleteCartProduct,
  getProductsFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
