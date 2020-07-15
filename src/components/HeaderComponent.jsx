import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faAlignRight,
  faStore,
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

const HeaderComponent = (props) => {
  return (
    <>
      <nav class="navbar navbar-light bg-secondary">
        <Link class="navbar-brand" to="/">
          <h3 className="text-warning" onClick={props.getProductsFromCart()}>
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
            <Dropdown.Item onClick={props.priceLowToHighFilter}>
              Price Low
            </Dropdown.Item>
            <Dropdown.Item onClick={props.priceHighToLowFilter}>
              Price High
            </Dropdown.Item>
            <Dropdown.Item onClick={props.ascendingFilter}>A - Z</Dropdown.Item>
            <Dropdown.Item onClick={props.descendingFilter}>
              Z - A
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Link to="/cart" onClick={props.getProductsFromCart}>
          <div className="btn btn-outline-light my-2 my-sm-0 pb-0">
            <h4 className="text-dark">
              <FontAwesomeIcon
                icon={faCartPlus}
                color="orange"
                className="mr-2"
                size="1x"
              />
              {props.cartCount}
            </h4>
          </div>
        </Link>
      </nav>
    </>
  );
};
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
