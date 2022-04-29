import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./app.css";
import Home from "./components/pages/home/Home";
import NewProduct from "./components/pages/newProduct/NewProduct";
import UpdateProduct from "./components/pages/updateProduct/UpdateProduct";
import ShowProduct from "./components/pages/showProduct/ShowProduct";
const App = () => {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addProduct" element={<NewProduct />} />
          <Route path="/editProduct/:productId" element={<UpdateProduct />} />
          <Route path="/product/:productId" element={<ShowProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
