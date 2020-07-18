import React, { Component } from "react";
import HomeComponent from "./HomeComponent";
import { connect } from "react-redux";
import {
  getProducts,
  editProduct,
  addToCart,
  updateQuntity,
  decreaseQuntity,
  getProductsFromCart,
  updateProduct,
  handleSignup,
} from "../redux/product/productAction";

class MainComponent extends Component {
  state = {
    error: null,
    isEdit: false,
    quantity: 0,
    currentUser: {},
  };

  componentDidMount() {
    const getDataFromLocalStorage = localStorage.getItem("userDetails");
    const parseDataFromJSON = JSON.parse(getDataFromLocalStorage);
    console.log("Local Storage Data", parseDataFromJSON);
    this.setState({ currentUser: parseDataFromJSON });

    const {
      props: { getProductsFromCart, getProducts },
    } = this;

    getProductsFromCart();
    getProducts();
    // this.timer = setInterval(() => this.props.getProductsFromCart(), 500);
    // this.timer2 = setInterval(() => this.props.getProducts(), 500);
  }

  // componentWillUnmount() {
  //   clearTimeout(setTimeout(this.props.getProductsFromCart(), 500));
  //   clearInterval(this.timer);
  //   this.timer = null;
  //   clearTimeout(setTimeout(this.props.getProducts(), 500));
  //   clearInterval(this.timer2);
  //   this.timer2 = null;
  // }

  increaseQuntity = (item) => {
    this.props.getProductsFromCart();
    var userQuantity = 0;
    console.log("Inside Increase Function");
    this.props.cart.forEach((element) => {
      if (item._id == element.productId && this.props.user) {
        userQuantity = element.userQuantity + 1;

        this.props.updateQuntity(element._id, { userQuantity }, item);
        this.props.updateProduct({ userQuantity }, item._id);
        console.log(userQuantity, element._id);
      } else {
        this.props.handleSignup();
      }
    });
  };

  decreaseQuntity = (item) => {
    this.props.getProductsFromCart();
    var userQuantity = 0;
    console.log("Inside Increase Function");
    this.props.cart.forEach((element) => {
      if (item._id == element.productId && this.props.user) {
        userQuantity = element.userQuantity - 1;

        this.props.updateQuntity(element._id, { userQuantity }, item);
        this.props.updateProduct({ userQuantity }, item._id);
        console.log(userQuantity, element._id);
      } else {
        this.props.handleSignup();
      }
    });
  };

  handleEditProduct = async (item) => {
    await this.setState((state) => {
      if (this.props.isEdit) return { isEdit: false };
    });
    console.log(item);

    this.setState({ isEdit: true });
    if (this.props.user) {
      this.props.editProduct(item);
    } else {
      this.props.handleSignup();
    }
  };

  handleAddToCart = async (item) => {
    console.log("get ID ", item._id);

    if (this.props.user) {
      this.props.addToCart(item._id);
    } else {
      this.props.handleSignup();
    }
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
                user={this.props.user}
                handleSignup={this.props.handleSignup}
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
    user: state.user,
  };
};
const mapDispatchToProps = {
  getProducts,
  editProduct,
  addToCart,
  updateQuntity,
  decreaseQuntity,
  getProductsFromCart,
  updateProduct,
  handleSignup,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
