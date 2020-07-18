import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faAlignRight,
  faStore,
  faDoorClosed,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import {
  ascendingFilter,
  descendingFilter,
  priceHighToLowFilter,
  priceLowToHighFilter,
  getProductsFromCart,
  handleSignup,
  handleLogin,
  logout,
  resumeUser,
} from "../redux/product/productAction";

import { Dropdown, Navbar, Nav, NavDropdown } from "react-bootstrap";

import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";

class HeaderComponent extends Component {
  state = {
    show: false,
    currentUser: {},
  };

  // componentDidMount() {
  //   const getDataFromLocalStorage = localStorage.getItem("userDetails");
  //   const parseDataFromJSON = JSON.parse(getDataFromLocalStorage);
  //   console.log("Local Storage Data", parseDataFromJSON);
  //   this.setState({ currentUser: parseDataFromJSON });
  // }

  componentDidMount() {
    const getDataFromLocalStorage = localStorage.getItem("userDetails");
    const parseDataFromJSON = JSON.parse(getDataFromLocalStorage);
    console.log("Local Storage Data", parseDataFromJSON);
    this.setState({ currentUser: parseDataFromJSON });
    this.props.resumeUser(parseDataFromJSON);
  }

  handleLogin = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  logout = () => {
    const logout = {};
    localStorage.setItem("userDetails", JSON.stringify(logout));
  };
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>
            <Link
              class="navbar-brand"
              to="/"
              className="text-warning"
              onClick={this.props.getProductsFromCart}
            >
              <FontAwesomeIcon
                icon={faStore}
                size="1x"
                className="mr-1 text-white"
              />
              Store
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {this.props.user && (
              <Nav className="mr-5 text-left">
                <Nav.Link>
                  <Link to="/add_product">
                    <div className="btn btn-outline-warning my-2 my-sm-0 ">
                      Add Product
                    </div>
                  </Link>
                </Nav.Link>
                <Nav.Link>
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
                </Nav.Link>
              </Nav>
            )}
            {/* Right Side Section */}
            <Nav className="ml-auto text-right">
              {this.props.user ? (
                <>
                  <Nav.Link>
                    <Link to="/cart" onClick={this.props.getProductsFromCart}>
                      <div className="btn btn-outline-warning my-2 my-sm-0 pb-0">
                        <h4 className="text-white">
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
                  </Nav.Link>

                  <Nav.Link>
                    <div
                      className="btn my-2 my-sm-0 pb-0"
                      onClick={this.props.logout}
                    >
                      <h6 className="text-light">
                        <FontAwesomeIcon
                          icon={faDoorClosed}
                          color="orange"
                          className="mr-2"
                          size="1x"
                        />
                        LogOut
                      </h6>
                    </div>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link>
                  <div
                    className="btn my-2 my-sm-0 pb-0"
                    onClick={this.props.handleSignup}
                  >
                    <h6 className="text-light">Signup / Login</h6>
                  </div>
                  <SignupModal show={this.props.show} />
                  <LoginModal show={this.props.showlogin} />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartCount: state.cartCount,
    show: state.show,
    showlogin: state.showlogin,
    isAuthorize: state.isAuthorize,
    user: state.user,
  };
};

const mapDispatchToProps = {
  ascendingFilter,
  descendingFilter,
  priceHighToLowFilter,
  priceLowToHighFilter,
  getProductsFromCart,
  handleSignup,
  handleLogin,
  logout,
  resumeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
