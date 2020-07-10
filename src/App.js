import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import AppRoutes from "./app_routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
};

export default App;
