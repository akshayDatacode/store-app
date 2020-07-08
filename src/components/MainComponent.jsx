import React, { Component } from "react";
import HomeComponnt from "./HomeComponent";
import AddProductComponent from "./AddProductComponent";
import axios from "axios";

const add_product = "http://www.localhost:5000/api/add_product";

class MainCompoonent extends Component {
  state = {
    error: null,
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
        <HomeComponnt />
        <AddProductComponent addProduct={this.addProduct} />
      </>
    );
  }
}

export default MainCompoonent;
