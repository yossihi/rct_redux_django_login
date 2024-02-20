import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProdAsync,
  deleteAsync,
  loadDataAsync,
  Products,
  updProdAsync,
} from "./prodSlice";
import { selectCount } from "../login/loginSlice";

export function Prod() {
  const [newdesc, setNewdesc] = useState("");
  const [newprice, setNewprice] = useState(0);
  const [loadFlag, setLoadFlag] = useState(true);
  const products = useSelector(Products);
  const logged = useSelector(selectCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDataAsync());
  }, [loadFlag]);

  const handleAdd = async () => {
    await dispatch(addProdAsync({ desc: newdesc, price: newprice }));
    setLoadFlag(!loadFlag);
  };

  const handleDel = async (prodID) => {
    await dispatch(deleteAsync(prodID));
    setLoadFlag(!loadFlag);
  };

  const handleUpd = async (prodID) => {
    await dispatch(
      updProdAsync({
        prodID: prodID,
        formData: { desc: newdesc, price: newprice },
      })
    );
    setLoadFlag(!loadFlag);
  };

  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center">Product CRUD Handler</h1>
        {products.length}
        <div className="mb-3">
          <label htmlFor="productDesc" className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="productDesc"
            placeholder="Default description"
            onChange={(e) => {
              setNewdesc(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            placeholder="1"
            onChange={(e) => {
              setNewprice(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            handleAdd();
          }}
        >
          Add Product
        </button>
      </div>
      {logged ? (
        products.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul className="list-group mt-3">
            {products.map((product) => (
              <li key={product.id} className="list-group-item">
                <h3>Description: {product.desc}</h3>
                <h5>Price: {product.price}</h5>
                <button
                  type="button"
                  className="btn btn-danger me-2"
                  onClick={() => {
                    handleDel(product.id);
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => {
                    handleUpd(product.id);
                  }}
                >
                  Update
                </button>
              </li>
            ))}
          </ul>
        )
      ) : (
        "please log in "
      )}
    </div>
  );
}
