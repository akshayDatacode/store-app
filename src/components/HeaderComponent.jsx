import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faAlignRight,
  faStore,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import {
  ascendingFilter,
  descendingFilter,
  priceHighToLowFilter,
  priceLowToHighFilter,
  getProductsFromCart,
} from "../redux/product/productAction";

import { Dropdown } from "react-bootstrap";

import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";

class HeaderComponent extends Component {
  state = {
    show: false,
    showLogin: false,
  };

  handleSignup = () => {
    this.setState({ show: true, showLogin: false });
  };

  handleLogin = () => {
    this.setState({ showLogin: true, show: false });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleShowLogin = () => {
    this.setState({ showLogin: true });
  };

  render() {
    return (
      <>
        <nav class="navbar navbar-light bg-secondary">
          <Link class="navbar-brand" to="/">
            <h3
              className="text-warning"
              onClick={this.props.getProductsFromCart()}
            >
              <FontAwesomeIcon
                icon={faStore}
                size="1x"
                className="mr-1 text-white"
              />
              Store
            </h3>
          </Link>
          <Link to="/add_product">
            <div className="btn btn-outline-warning my-2 my-sm-0 ">
              Add Product
            </div>
          </Link>

          <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
              <FontAwesomeIcon icon={faAlignRight} className="mr-2" />
              Filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={this.props.priceLowToHighFilter}>
                Price Low
              </Dropdown.Item>
              <Dropdown.Item onClick={this.props.priceHighToLowFilter}>
                Price High
              </Dropdown.Item>
              <Dropdown.Item onClick={this.props.ascendingFilter}>
                A - Z
              </Dropdown.Item>
              <Dropdown.Item onClick={this.props.descendingFilter}>
                Z - A
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div
            className="btn btn-outline-light my-2 my-sm-0 pb-0"
            onClick={this.handleSignup}
          >
            <h4 className="text-dark">Signup</h4>
          </div>
          <div
            className="btn btn-outline-light  pb-0"
            onClick={this.handleLogin}
          >
            <h4 className="text-dark">login</h4>
          </div>

          <SignupModal
            handleShow={this.handleShow}
            handleClose={this.handleClose}
            show={this.state.show}
          />

          <LoginModal
            handleShowLogin={this.handleShowLogin}
            handleClose={this.handleClose}
            showLogin={this.state.show}
          />
          <Link to="/cart" onClick={this.props.getProductsFromCart}>
            <div className="btn btn-outline-light my-2 my-sm-0 pb-0">
              <h4 className="text-dark">
                <FontAwesomeIcon
                  icon={faCartPlus}
                  color="orange"
                  className="mr-2"
                  size="1x"
                />
                {this.props.cartCount}
              </h4>
            </div>
          </Link>
        </nav>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartCount: state.cartCount,
  };
};

const mapDispatchToProps = {
  ascendingFilter,
  descendingFilter,
  priceHighToLowFilter,
  priceLowToHighFilter,
  getProductsFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
