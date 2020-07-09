import React from "react";
import { Switch, Route } from "react-router-dom";
import CartComponent from "../components/CartComponent";
import MainComponent from "../components/MainComponent";
import AddProductComponent from "../components/AddProductComponent";

const AppRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={MainComponent} />
        <Route exact path="/cart" component={CartComponent} />
        <Route exact path="/add_product" component={AddProductComponent} />
      </Switch>
    </>
  );
};

export default AppRoutes;
