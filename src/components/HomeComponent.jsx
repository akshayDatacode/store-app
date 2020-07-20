import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCartPlus } from "@fortawesome/free-solid-svg-icons";

class HomeComponent extends Component {
  render() {
    const {
      props: {
        product,
        handleAddToCart,
        handleEditProduct,
        handleSignup,
        increaseQuntity,
        decreaseQuntity,
        user,
      },
    } = this;

    return (
      <>
        <div className="container">
          <h3 className="text-center mt-5 mb-3">Product List </h3>
          <div className="row">
            <div className="col">
              <div className="row">
                {product.map((item) => (
                  <div className="col-md-4 card-deck ">
                    <div className="card mb-3 shadow-lg border border-secondary">
                      <div className="card-body">
                        <h4 className="text-primary text-weight-bold">
                          <b>{item.title}</b>
                        </h4>
                        <h6>Price : {item.price} /-</h6>
                        {/* <p>Quantity : {item.quantity - item.userQuantity}</p> */}
                        <b className="text-success">
                          Discount : {item.discount} %
                        </b>
                      </div>
                      <div className="card-footer m-0 pt-0 pb-2 bg-white border border-white ">
                        <div className="row">
                          <div className="col-3">
                            <div
                              className="btn btn-secondary mr-2 btn-sm"
                              onClick={() => handleAddToCart(item)}
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
                            {item.userQuantity > 0 && (
                              <div
                                className="btn  mr-2 btn-sm"
                                onClick={() => decreaseQuntity(item)}
                              >
                                <FontAwesomeIcon icon={faMinus} color="red" />
                              </div>
                            )}
                            <div className="badge badge-primary">
                              {item.userQuantity}
                            </div>
                            {item.quantity - item.userQuantity != 0 && (
                              <div
                                className="btn  ml-2 btn-sm"
                                onClick={() => increaseQuntity(item)}
                              >
                                <FontAwesomeIcon icon={faPlus} color="green" />
                              </div>
                            )}
                          </div>
                          <div className="col-3">
                            {user ? (
                              <Link to="add_product">
                                <div
                                  className="btn btn-warning btn-sm"
                                  onClick={() => handleEditProduct(item)}
                                >
                                  Edit
                                </div>
                              </Link>
                            ) : (
                              handleSignup
                            )}
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
