import React, { Component } from "react";
import HomeComponent from "./HomeComponent";
import { connect } from "react-redux";
import {
  getProducts,
  editProduct,
  addToCart,
  updateQuntity,
  getProductsFromCart,
  updateProduct,
  handleSignup,
} from "../redux/product/productAction";

class MainComponent extends Component {
  state = {
    error: null,
    isEdit: false,
  };

  componentDidMount() {
    const {
      props: { getProductsFromCart, getProducts },
    } = this;

    getProductsFromCart();

    getProducts().then((res) => {
      console.log(res);
    });
  }

  increaseQuntity = (item) => {
    const {
      props: {
        cart,
        user,
        updateProduct,
        updateQuntity,
        handleSignup,
        getProducts,
        getProductsFromCart,
      },
    } = this;

    var userQuantity = 0;
    cart.forEach((element) => {
      if (item._id == element.productId && user) {
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
      } else {
        handleSignup();
      }
    });
  };

  decreaseQuntity = (item) => {
    const {
      props: {
        cart,
        user,
        updateProduct,
        updateQuntity,
        handleSignup,
        getProducts,
        getProductsFromCart,
      },
    } = this;

    var userQuantity = 0;

    cart.forEach((element) => {
      if (item._id == element.productId && user) {
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
      } else {
        handleSignup();
      }
    });
  };

  handleEditProduct = async (item) => {
    const {
      props: { isEdit, editProduct, handleSignup, user },
    } = this;

    await this.setState((state) => {
      if (isEdit) return { isEdit: false };
    });
    console.log(item);

    this.setState({ isEdit: true });
    if (user) {
      editProduct(item);
    } else {
      handleSignup();
    }
  };

  handleAddToCart = async (item) => {
    const {
      props: { user, addToCart, handleSignup, getProductsFromCart },
    } = this;
    if (user) {
      addToCart(item._id).then((res) => {
        if (res.success) {
          getProductsFromCart();
        }
      });
    } else {
      handleSignup();
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
                product={this.props.product}
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
  getProductsFromCart,
  updateProduct,
  handleSignup,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
