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
    products : []
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
        this.intervalID = setTimeout(this.getMessages, 1000);
      })
      .catch((error) =>
        this.setState({
          error,
        })
      );
  };

  
  addProduct = (product) => {
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
  };

  render() {
    return (
      <>
        <h1>Main Component</h1>
        <HomeComponnt products = {this.state.products}/>
        <AddProductComponent addProduct={this.addProduct} />
      </>
    );
  }
}

export default MainCompoonent;
