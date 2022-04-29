import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./showProduct.css";

import * as api from "../../../api/index";

import { ToggleOn, MonetizationOn } from "@material-ui/icons";
import { useParams } from "react-router-dom";
export default function ShowProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();
  const [prod, setProduct] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.fetchProduct(productId);
      setProduct(res.data.product);
    };
    fetchProduct();
  }, []);

  return (
    <div className="product">
      <div className="productContainer">
        <div className="productShow">
          <span className="productUpdateTitle">Product Details</span>
          <div className="productShowBottom">
            <div className="productShowInfo">
              <ToggleOn className="productShowIcon" />
              <span className="productShowInfoTitle">Name : {prod.nom}</span>
            </div>
            <div className="productShowInfo">
              <MonetizationOn className="productShowIcon" />
              <span className="productShowInfoTitle">Price : {prod.prix}</span>
            </div>
            <div className="productShowInfo">
              <ToggleOn className="productShowIcon" />
              <span className="productShowInfoTitle">
                quantity : {prod.quantite}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
