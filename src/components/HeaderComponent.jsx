import React from "react";
const HeaderComponent = () => {
  return (
    <>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand">Store</a>
        <button class="btn btn-outline-success my-2 my-sm-0">
          Add Product
        </button>
        <button class="btn btn-outline-success my-2 my-sm-0">Cart</button>
      </nav>
    </>
  );
};

export default HeaderComponent;
