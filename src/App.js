import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import AppRoutes from "./app_routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
};

export default App;
