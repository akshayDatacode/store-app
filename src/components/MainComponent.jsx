import React, { Component } from "react";
import HomeComponent from "./HomeComponent";
import { connect } from "react-redux";
import {
  getProducts,
  editProduct,
  addToCart,
  increaseQuntity,
  decreaseQuntity,
  getProductsFromCart,
  updatedQuantityInStore,
} from "../redux/product/productAction";

class MainComponent extends Component {
  state = {
    error: null,
    isEdit: false,
    quantity: 0,
  };

  componentDidMount() {
    this.props.getProducts();
    this.props.getProductsFromCart();
    this.props.updatedQuantityInStore();
  }

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

  decreaseQuntity = (item) => {
    this.props.decreaseQuntity(item._id);
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
    console.log("get ID ", item._id);
    this.props.addToCart(item._id);
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-11">
              <HomeComponent
                products={this.props.product}
                cart={this.props.cart}
                quantity={this.state.quantity}
                handleEditProduct={this.handleEditProduct}
                handleAddToCart={this.handleAddToCart}
                increaseQuntity={this.increaseQuntity}
                decreaseQuntity={this.decreaseQuntity}
              />
            </div>
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
  getProductsFromCart,
  updatedQuantityInStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
