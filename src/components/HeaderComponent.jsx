import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faAlignRight } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import {
  ascendingFilter,
  descendingFilter,
  priceHighToLowFilter,
  priceLowToHighFilter,
} from "../redux/product/productAction";

import { Dropdown } from "react-bootstrap";

const HeaderComponent = (props) => {
  return (
    <>
      <nav class="navbar navbar-light bg-light">
        <Link class="navbar-brand" to="/">
          Store
        </Link>
        <Link to="/add_product">
          <div className="btn btn-outline-success my-2 my-sm-0 ">
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
        <Link to="/cart">
          <div className="btn btn-outline-secondary my-2 my-sm-0">
            <FontAwesomeIcon
              icon={faCartPlus}
              color="purple"
              className="mr-2"
              size="2x"
            />
            <h4 className="text-dark">{props.cartCount}</h4>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
