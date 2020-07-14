import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCartPlus } from "@fortawesome/free-solid-svg-icons";

class HomeComponent extends Component {
  render() {
    return (
      <>
        <div className="container">
          <h3 className="text-center mt-5 mb-3">Product List </h3>
          <div className="row">
            <div className="col">
              <div className="row">
                {this.props.products.map((item) => (
                  <div className="col-md-4 card-deck ">
                    <div className="card mb-3 shadow-lg border border-secondary">
                      <div className="card-body">
                        <h4 className="text-primary text-weight-bold">
                          <b>{item.title}</b>
                        </h4>
                        <h6>Price : {item.price} /-</h6>
                        <p>Quantity : {item.quantity}</p>
                        <b className="text-success">
                          Discount : {item.discount} %
                        </b>
                      </div>
                      <div className="card-footer m-0 pt-0 pb-2 bg-white border border-white ">
                        <div className="row">
                          <div className="col-3">
                            <div
                              className="btn btn-secondary mr-2 btn-sm"
                              onClick={() => this.props.handleAddToCart(item)}
                            >
                              <FontAwesomeIcon
                                icon={faCartPlus}
                                color="orange"
                                className="mr-3"
                                size="1x"
                              />
                            </div>
                          </div>
                          <div className="col-6 text-center ">
                            <div
                              className="btn  mr-2 btn-sm"
                              onClick={() => this.props.decreaseQuntity(item)}
                            >
                              <FontAwesomeIcon icon={faMinus} color="red" />
                            </div>

                            <div className="badge badge-primary">
                              {item.userQuantity}
                            </div>
                            {item.quantity != 0 && (
                              <div
                                className="btn  ml-2 btn-sm"
                                onClick={() => this.props.increaseQuntity(item)}
                              >
                                <FontAwesomeIcon icon={faPlus} color="green" />
                              </div>
                            )}
                          </div>
                          <div className="col-3">
                            <Link to="add_product">
                              <div
                                className="btn btn-warning btn-sm"
                                onClick={() =>
                                  this.props.handleEditProduct(item)
                                }
                              >
                                Edit
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default HomeComponent;
