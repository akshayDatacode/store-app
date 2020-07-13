import React, { Component } from "react";
import { connect } from "react-redux";
import {
  totalPrice,
  increaseQuntity,
  decreaseQuntity,
} from "../redux/product/productAction";

class CartComponent extends Component {
  componentDidMount = () => {
    this.props.totalPrice();
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
                        <h6 className="text-primary text-weight-bold">
                          <b>{item.title}</b>
                        </h6>
                        <h6 className="text-back"> Price :{item.price} /-</h6>

                        {/* <p>Quantity : {item.quantity}</p> */}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
