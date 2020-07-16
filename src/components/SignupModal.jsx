import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { signupUser } from "../redux/product/productAction";

class SignupModal extends Component {
  state = {
    username: "",
    email: "",
    password: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    console.log(user);
    this.props.signupUser(user);

    this.setState({ username: "", email: "", password: "" });
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
        <Modal show={this.props.show} size="lg" onHide={this.props.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="text-center">
            <form>
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  Username
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    placeholder="Sender Name"
                    value={this.state.username}
                    name="username"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    placeholder="Sender Name"
                    value={this.state.email}
                    name="email"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  Password
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    placeholder="Sender Name"
                    value={this.state.password}
                    name="password"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-10">
                  <div onClick={this.handleSubmit}>
                    <div className="btn btn-primary ">Add Product</div>
                  </div>
                </div>
              </div>
              <p onClick={this.props.handleLogin}>Already Sugnup : Login</p>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = {
  signupUser,
};

export default connect(null, mapDispatchToProps)(SignupModal);
