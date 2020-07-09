import React, { Component } from "react";
import HomeComponent from "./HomeComponent";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProducts,
  editProduct,
  addToCart,
} from "../redux/product/productAction";

class MainComponent extends Component {
  state = {
    error: null,
    isEdit: false,
  };

  componentDidMount() {
    this.props.getProducts();
  }

  // getProducts = () => {
  //   axios
  //     .get(get_products)
  //     .then((result) => {
  //       this.setState({
  //         products: result.data.product,
  //       });
  //       this.intervalID = setTimeout(this.getProducts, 1000);
  //     })
  //     .catch((error) =>
  //       this.setState({
  //         error,
  //       })
  //     );
  // };

  // addProduct = (product, id) => {
  //   if (!id) {
  //     axios
  //       .post(add_product, product)
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         this.setState({
  //           error,
  //         });
  //       });
  //   } else {
  //     this.updateProduct(id, product);
  //   }
  // };

  // updateProduct = (id, product) => {
  //   console.log(id, product);
  //   axios
  //     .put(`http://www.localhost:5000/api/edit_product/${id}`, product)
  //     .then((res) => {
  //       console.log(" Edit status", res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   this.setState({ show: false });
  // };

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
              <Link to="/add_product">
                <div className="btn btn-primary m-5">Add Product</div>
              </Link>
              <Link to="/cart">
                <div className="btn btn-success">Cart</div>
              </Link>
              <HomeComponent
                products={this.props.product}
                handleEditProduct={this.handleEditProduct}
                handleAddToCart={this.handleAddToCart}
              />
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>

        {/* <AddProductComponent
          addProduct={this.addProduct}
          isEdit={this.state.isEdit}
          editProduct={this.state.editProduct}
        /> */}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
