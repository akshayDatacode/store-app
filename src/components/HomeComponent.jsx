import React, { Component } from "react";
class HomeComponnt extends Component {
  state = {};
  render() {
    return (
      <>
        <h1>Home Component</h1>
        <div className="row">
          <div className="col">
          {this.props.products.map((item) => (
            <div className="card">
              <div className="card-body">
                <h1>{item.title}</h1>
                <h2>{item.price}</h2>
                <h3>{item.size}</h3>
                <h4>{item.discount}</h4>
              </div>
            </div>

          ))}
            
          </div>
        </div>
      </>
    );
  }
}

export default HomeComponnt;
