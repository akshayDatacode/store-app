import React, { Component } from "react";
class AddProductComponent extends Component {
  state = {
    title: "",
    price: "",
    size: "",
    discount: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      title: this.state.title,
      price: this.state.price,
      size: this.state.size,
      discount: this.state.discount,
    };

    this.props.addProduct(product);

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
        <div className="row">
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
                  <textarea
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
                  <button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Add Product
                  </button>
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

export default AddProductComponent;
