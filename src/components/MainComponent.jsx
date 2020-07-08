import React, { Component } from "react";
import HomeComponnt from "./HomeComponent";
import AddProductComponent from "./AddProductComponent";
import axios from "axios";

const add_product = "http://www.localhost:5000/api/add_product";
const get_products = "http://www.localhost:5000/api/get_products";

class MainCompoonent extends Component {
  intervalID;

  state = {
    error: null,
    products: [],
    editProduct: [],
    isEdit: false,
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

  render() {
    return (
      <>
        <h1>Main Component</h1>
        <HomeComponnt
          products={this.state.products}
          handleEditProduct={this.handleEditProduct}
        />
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
