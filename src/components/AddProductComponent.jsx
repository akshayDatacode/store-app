import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addProductDetails,
  updateProduct,
} from "../redux/product/productAction";
import { Link } from "react-router-dom";

class AddProductComponent extends Component {
  state = {
    title: "",
    price: "",
    size: "",
    discount: "",
    id: "",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isEdit !== this.props.isEdit && this.props.isEdit) {
      this.setState({
        title: this.props.editProduct.title,
        price: this.props.editProduct.price,
        size: this.props.editProduct.size,
        discount: this.props.editProduct.discount,
        id: this.props.editProduct._id,
      });
      console.log("Inside");
    } else {
      console.log("Out Side");
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      title: this.state.title,
      price: this.state.price,
      size: this.state.size,
      discount: this.state.discount,
    };
    if (!this.props.isEdit) {
      this.props.addProductDetails(product);
    } else {
      this.props.updateProduct(product, this.state.id);
    }

    this.setState({ title: "", price: "", size: "", discount: "" });
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
                    placeholder="Sender Name"
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
                    placeholder="Sender Name"
                    value={this.state.price}
                    name="price"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  Size
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    placeholder="Sender Name"
                    value={this.state.size}
                    name="size"
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
                    placeholder="Discount %"
                    name="discount"
                    value={this.state.discount}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              {this.props.error && <p className="text-danger">Enter Data</p>}

              <div className="form-group row">
                <div className="col-sm-10">
                  <div onClick={this.handleSubmit}>
                    <Link to="/">
                      <div className="btn btn-primary ">Add Product</div>
                    </Link>
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
