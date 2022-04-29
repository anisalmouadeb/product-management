import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import "./home.css";

import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../../../actions/products";

import { TextField } from "@material-ui/core";
export default function Home() {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "nom", headerName: "Product Name", width: 200 },
    { field: "quantite", headerName: "Quantity", width: 200 },
    { field: "prix", headerName: "Price", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListShow">Show</button>
            </Link>
            <Link to={"/editProduct/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => dispatch(deleteProduct(params.row.id))}
            />
          </>
        );
      },
    },
  ];
  let rows;
  products
    ? (rows = products
        .filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (val.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val;
          }
        })
        .map((prod) => {
          return {
            id: prod._id,
            nom: prod.nom,
            quantite: prod.quantite,
            prix: prod.prix,
          };
        }))
    : (rows = []);

  return (
    <div className="home">
      <div className="topWrapper">
        <div className="topLeft">
          <div className="productTitleContainer">
            <h1 className="productTitle">List of Products</h1>
          </div>
          <Link to={"/addProduct"}>
            <button className="productListAdd">Add New Product</button>
          </Link>
        </div>
        <div className="topRight">
          <TextField
            type="text"
            placeholder="Search..."
            autoComplete="off"
            className="productUpdateInput"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>

      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
