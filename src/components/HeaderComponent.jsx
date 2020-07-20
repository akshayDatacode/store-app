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

import { Dropdown, Navbar, Nav } from "react-bootstrap";

import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";

class HeaderComponent extends Component {
  componentDidMount() {
    const getDataFromLocalStorage = localStorage.getItem("userDetails");
    const parseDataFromJSON = JSON.parse(getDataFromLocalStorage);
    console.log("Local Storage Data", parseDataFromJSON);
    this.setState({ currentUser: parseDataFromJSON });
    this.props.resumeUser(parseDataFromJSON);
  }

  render() {
    const {
      props: {
        getProductsFromCart,
        user,
        ascendingFilter,
        priceHighToLowFilter,
        priceLowToHighFilter,
        descendingFilter,
        logout,
        cartCount,
        handleSignup,
        show,
        showlogin,
        product,
      },
    } = this;

    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>
            <Link
              class="navbar-brand"
              to="/"
              className="text-warning"
              onClick={getProductsFromCart}
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
            {user && (
              <Nav className="mr-5 text-left">
                <Nav.Link>
                  <Link to="/add_product">
                    <div className="btn btn-outline-warning my-2 my-sm-0 ">
                      Add Product
                    </div>
                  </Link>
                </Nav.Link>
                {product.length > 2 && (
                  <Nav.Link>
                    <Dropdown>
                      <Dropdown.Toggle variant="warning" id="dropdown-basic">
                        <FontAwesomeIcon icon={faAlignRight} className="mr-2" />
                        Filter
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={priceLowToHighFilter}>
                          Price Low
                        </Dropdown.Item>
                        <Dropdown.Item onClick={priceHighToLowFilter}>
                          Price High
                        </Dropdown.Item>
                        <Dropdown.Item onClick={ascendingFilter}>
                          A - Z
                        </Dropdown.Item>
                        <Dropdown.Item onClick={descendingFilter}>
                          Z - A
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Link>
                )}
              </Nav>
            )}
            {/* Right Side Section */}
            <Nav className="ml-auto text-right">
              {user ? (
                <>
                  <Nav.Link>
                    <Link to="/cart" onClick={getProductsFromCart}>
                      <div className="btn btn-outline-warning my-2 my-sm-0 pb-0">
                        <h4 className="text-white">
                          <FontAwesomeIcon
                            icon={faCartPlus}
                            color="orange"
                            className="mr-2"
                            size="1x"
                          />
                          {cartCount}
                        </h4>
                      </div>
                    </Link>
                  </Nav.Link>

                  <Nav.Link>
                    <div className="btn my-2 my-sm-0 pb-0" onClick={logout}>
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
                  <div className="btn my-2 my-sm-0 pb-0" onClick={handleSignup}>
                    <h6 className="text-light">Signup / Login</h6>
                  </div>
                  <SignupModal show={show} />
                  <LoginModal show={showlogin} />
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
    product: state.product,
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
