import React, { Component } from "react";
import { Link } from "react-router-dom";

const HomeComponent = (props) => {
  return (
    <>
      <h3 className="text-center mt-5 mb-3">Product List </h3>
      <div className="row">
        <div className="col">
          {props.products.map((item) => (
            <div className="card mb-3 shadow-lg border">
              <div className="card-body">
                <h3 className="text-primary">{item.title}</h3>
                <h6>Price : {item.price} /-</h6>
                <p>Size : {item.size}</p>
                <b className="text-success">Discount : {item.discount} %</b>
              </div>
              <div className="card-footer m-0 pt-0 pb-2 bg-white border border-white ">
                <div
                  className="btn btn-secondary mr-2"
                  onClick={() => props.handleAddToCart(item)}
                >
                  Add to Cart
                </div>
                <Link to="add_product">
                  <div
                    className="btn btn-warning"
                    onClick={() => props.handleEditProduct(item)}
                  >
                    Edit
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
