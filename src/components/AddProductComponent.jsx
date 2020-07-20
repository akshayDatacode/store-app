import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addProductDetails,
  updateProduct,
} from "../redux/product/productAction";

import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

class AddProductComponent extends Component {
  state = {
    title: "",
    price: "",
    quantity: "",
    discount: "",
    id: "",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isEdit !== this.props.isEdit && this.props.isEdit) {
      this.setState({
        title: this.props.editProduct.title,
        price: this.props.editProduct.price,
        quantity: this.props.editProduct.quantity,
        discount: this.props.editProduct.discount,
        id: this.props.editProduct._id,
      });
    }
  }

  handleSubmit = (event) => {
    const {
      props: { isEdit, addProductDetails, updateProduct },
    } = this;

    event.preventDefault();

    const product = {
      title: this.state.title,
      price: this.state.price,
      quantity: this.state.quantity,
      discount: this.state.discount,
    };
    if (!isEdit) {
      addProductDetails(product).then((res) => {
        if (res.success) {
          store.addNotification({
            title: "Success",
            message: "Your New Product is Added",
            type: "success", // 'default', 'success', 'info', 'warning'
            container: "bottom-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 3000,
            },
          });
          window.location = "/";
        }
      });
    } else {
      updateProduct(product, this.state.id).then((res) => {
        if (res.success) {
          store.addNotification({
            title: "Success",
            message: "Your product is edited",
            type: "info", // 'default', 'success', 'info', 'warning'
            container: "bottom-right", // where to position the notifications
            animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            dismiss: {
              duration: 9000,
            },
          });
          window.location = "/";
        }
      });
    }
    this.setState({ title: "", price: "", quantity: "", discount: "" });
  };

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <>
        <div className="row mt-5">
          <div className="col-3"></div>
          <div className="col-6">
            <h2 className="text-center mb-5 text-primary">Add Product Form</h2>
            <form>
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  Title
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    value={this.state.title}
                    name="title"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  Price
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    value={this.state.price}
                    name="price"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  Quantity
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    value={this.state.quantity}
                    name="quantity"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="inputPassword3" className="col-sm-2 col-form-label">
                  Discount %
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    name="discount"
                    value={this.state.discount}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              {this.props.error && <p className="text-danger">Enter Data</p>}
              <div className="form-group row ">
                <div className="col-sm-10 text-center">
                  <div onClick={this.handleSubmit}>
                    <div className="btn btn-primary ">Add Product</div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-3"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editProduct: state.editProduct,
    isEdit: state.isEdit,
    error: state.error,
  };
};

const mapDispatchToProps = {
  addProductDetails,
  updateProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProductComponent);
