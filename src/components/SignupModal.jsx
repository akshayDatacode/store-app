import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  signupUser,
  handleClose,
  handleLogin,
} from "../redux/product/productAction";

class SignupModal extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.signupUser(user);
    this.props.handleClose();
    this.setState({ userName: "", email: "", password: "" });
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
          <Modal.Header closeButton>Signup</Modal.Header>
          <Modal.Body className="text-center">
            <form>
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  User Name
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    value={this.state.userName}
                    name="userName"
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
                    value={this.state.password}
                    name="password"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-10">
                  <div onClick={this.handleSubmit}>
                    <div className="btn btn-primary ">Signup</div>
                  </div>
                </div>
              </div>
              <p>
                Already have account{" "}
                <snap
                  onClick={this.props.handleLogin}
                  className=" btn text-success"
                >
                  Login
                </snap>{" "}
                from here!
              </p>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = {
  signupUser,
  handleClose,
  handleLogin,
};

export default connect(null, mapDispatchToProps)(SignupModal);
