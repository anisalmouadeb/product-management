import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./newProduct.css";
import { getProducts, createProduct } from "../../../actions/products";
import { TextField } from "@material-ui/core";

export default function NewProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const [productData, setProductData] = useState({
    nom: "",
    prix: 0,
    quantite: 0,
  });

  const [formErrors, setFormErrors] = useState({
    nom: false,
    prix: false,
    quantite: false,
  });
  const [formErrorsMsg, setFormErrorsMsg] = useState({
    nom: "",
    prix: "",
    quantite: "",
  });

  const verifExist = () => {
    var occ = 0;
    products.map((acc) => {
      if (acc.nom === productData.nom) {
        occ = occ + 1;
      }
    });
    if (occ === 0) {
      return false;
    } else {
      return true;
    }
  };

  const validate = (values) => {
    let nomError,
      prixError,
      quantityError = false;
    let nomErrorMsg,
      prixErrorMsg,
      quantityErrorMsg = "";
    if (
      values.nom &&
      values.prix &&
      Number(values.prix) >= 0 &&
      values.quantite &&
      Number(values.quantite) >= 0
    )
      return true;
    if (!values.nom) {
      nomError = true;
      nomErrorMsg = "required";
    }

    if (!values.prix) {
      prixError = true;
      prixErrorMsg = "required";
    }
    if (Number(values.prix) < 0) {
      prixError = true;
      prixErrorMsg = "can't be negative";
    }
    if (!values.quantite) {
      quantityError = true;
      quantityErrorMsg = "required";
    }
    if (Number(values.quantite) < 0) {
      quantityError = true;
      quantityErrorMsg = "can't be negative";
    }
    setFormErrors({ nom: nomError, prix: prixError, quantite: quantityError });
    setFormErrorsMsg({
      nom: nomErrorMsg,
      prix: prixErrorMsg,
      quantite: quantityErrorMsg,
    });
    return false;
  };

  const handleSubmit = (e) => {
    if (verifExist()) {
      e.preventDefault();
      return alert("please change name of product");
    }
    const isvalid = validate(productData);
    if (isvalid) {
      console.log("add");
      dispatch(createProduct(productData));
      dispatch(getProducts());
      navigate("../", { replace: true });
    } else {
      e.preventDefault();
    }
  };

  return (
    <div className="product">
      <div className="productContainer">
        <div className="productUpdate">
          <span className="productUpdateTitle">Add New Product</span>
          <form className="productUpdateForm">
            <div className="productUpdateLeft">
              <div className="productUpdateItem">
                <label>Product Name</label>
                <TextField
                  error={formErrors.nom}
                  helperText={formErrorsMsg.nom}
                  type="text"
                  placeholder="name"
                  autoComplete="off"
                  value={productData.nom}
                  onChange={(e) =>
                    setProductData({ ...productData, nom: e.target.value })
                  }
                  className="productUpdateInput"
                />
              </div>
              <div className="productUpdateItem">
                <label>Price</label>
                <TextField
                  error={formErrors.prix}
                  helperText={formErrorsMsg.prix}
                  type="number"
                  placeholder="Price"
                  className="productUpdateInput"
                  value={productData.prix}
                  onChange={(e) =>
                    setProductData({ ...productData, prix: e.target.value })
                  }
                />
              </div>

              <div className="productUpdateItem">
                <label>Quantity</label>
                <TextField
                  error={formErrors.quantite}
                  helperText={formErrorsMsg.quantite}
                  type="number"
                  placeholder="Price"
                  className="productUpdateInput"
                  value={productData.quantite}
                  onChange={(e) =>
                    setProductData({ ...productData, quantite: e.target.value })
                  }
                />
              </div>

              <button className="productUpdateButton" onClick={handleSubmit}>
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
