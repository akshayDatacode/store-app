import React, { Component } from "react";
import HomeComponent from "./HomeComponent";
import { connect } from "react-redux";
import {
  getProducts,
  editProduct,
  addToCart,
  increaseQuntity,
  decreaseQuntity,
} from "../redux/product/productAction";

class MainComponent extends Component {
  state = {
    error: null,
    isEdit: false,
    quantity: 0,
  };

  componentDidMount() {
    this.props.getProducts();
  }

  increaseQuntity = (item) => {
    this.props.increaseQuntity(item);
  };

  decreaseQuntity = (item) => {
    this.props.decreaseQuntity(item);
  };

  handleEditProduct = async (item) => {
    await this.setState((state) => {
      if (this.props.isEdit) return { isEdit: false };
    });
    console.log(item);
    this.setState({ isEdit: true });
    this.props.editProduct(item);
  };

  handleAddToCart = async (item) => {
    console.log("data get ", item);
    this.props.addToCart(item);
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <HomeComponent
                products={this.props.product}
                quantity={this.state.quantity}
                handleEditProduct={this.handleEditProduct}
                handleAddToCart={this.handleAddToCart}
                increaseQuntity={this.increaseQuntity}
                decreaseQuntity={this.decreaseQuntity}
              />
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    isEdit: state.isEdit,
    cart: state.cart,
  };
};
const mapDispatchToProps = {
  getProducts,
  editProduct,
  addToCart,
  increaseQuntity,
  decreaseQuntity,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
