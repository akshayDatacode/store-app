import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  loginUser,
  handleClose,
  handleSignup,
} from "../redux/product/productAction";

class LoginModal extends Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      props: { loginUser },
    } = this;
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    loginUser(user);
  };

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      handleSubmit,
      handleInputChange,
      props: { show, handleClose, handleSignup },
    } = this;
    return (
      <>
        <Modal show={show} size="lg" onHide={handleClose}>
          <Modal.Header closeButton>Login</Modal.Header>
          <Modal.Body className="text-center">
            <form>
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    value={this.state.email}
                    name="email"
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-10">
                  <div onClick={handleSubmit}>
                    <div className="btn btn-primary ">Login</div>
                  </div>
                </div>
              </div>
              <p>
                Don't have account ?
                <snap onClick={handleSignup} className=" btn text-success">
                  Signup
                </snap>
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
  loginUser,
  handleClose,
  handleSignup,
};

const mapStateToProps = (state) => {
  return {
    error: state.error,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
