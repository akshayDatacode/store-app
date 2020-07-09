import React, { Component } from "react";
import { connect } from "react-redux";

class CartComponent extends Component {
  state = {};
  render() {
    return (
      <>
        <h1>Shopping Cart</h1>
        <div className="row">
          <div className="col">
            HEllo
            {this.props.cart.map((item) => (
              <div className="card mb-3 shadow-lg border">
                HELLO
                <div className="card-body">
                  <h3 className="text-primary">{item.title}</h3>
                  <h6>Price : {item.price} /-</h6>
                  <p>Size : {item.size}</p>
                  <b className="text-success">Discount : {item.discount} %</b>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(CartComponent);
