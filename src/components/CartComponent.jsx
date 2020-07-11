import React, { Component } from "react";
import { connect } from "react-redux";
import { totalPrice } from "../redux/product/productAction";

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
            <h1 className="text-center text-primary mt-2  ">Shopping Cart</h1>

            {this.props.cart.map((item) => (
              <div className="card mb-3 shadow-lg border">
                <div className="card-body">
                  <h4 className="text-primary">{item.title}</h4>
                  <h4 className="text-back"> Price :{item.price} /-</h4>

                  <p>Quantity : {item.quantity}</p>
                  <b className="text-secondary">Discount : {item.discount} %</b>

                  <h3 className="text-success">
                    Net Price : {item.price * (1 - item.discount / 100)} /-
                  </h3>
                </div>
              </div>
            ))}
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
  };
};
const mapDispatchToProps = {
  totalPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
