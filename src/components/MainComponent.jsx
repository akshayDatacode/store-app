import React, { Component } from "react";
import HomeComponnt from "./HomeComponent";
import AddProductComponent from "./AddProductComponent";
import axios from "axios";
import HeaderComponent from "./HeaderComponent";

const add_product = "http://www.localhost:5000/api/add_product";
const get_products = "http://www.localhost:5000/api/get_products";

class MainCompoonent extends Component {
  intervalID;

  state = {
    error: null,
    products: [],
    editProduct: [],
    isEdit: false,
    cart: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  getProducts = () => {
    axios
      .get(get_products)
      .then((result) => {
        this.setState({
          products: result.data.product,
        });
        this.intervalID = setTimeout(this.getProducts, 1000);
      })
      .catch((error) =>
        this.setState({
          error,
        })
      );
  };

  addProduct = (product, id) => {
    if (!id) {
      axios
        .post(add_product, product)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            error,
          });
        });
    } else {
      this.updateProduct(id, product);
    }
  };

  updateProduct = (id, product) => {
    console.log(id, product);
    axios
      .put(`http://www.localhost:5000/api/edit_product/${id}`, product)
      .then((res) => {
        console.log(" Edit status", res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ show: false });
  };

  handleEditProduct = async (item) => {
    await this.setState((state) => {
      if (state.isEdit) return { isEdit: false };
    });
    console.log(item);
    this.setState({
      editProduct: item,
      isEdit: true,
    });
  };

  handleAddToCart = async (item) => {
    console.log("data get ", item);
    const cartRef = [...this.state.cart];
    cartRef.push(item);
    this.setState({
      cart: cartRef,
    });
    console.log(cartRef);
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <HomeComponnt
                products={this.state.products}
                handleEditProduct={this.handleEditProduct}
                handleAddToCart={this.handleAddToCart}
              />
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>

        <AddProductComponent
          addProduct={this.addProduct}
          isEdit={this.state.isEdit}
          editProduct={this.state.editProduct}
        />
      </>
    );
  }
}

export default MainCompoonent;
