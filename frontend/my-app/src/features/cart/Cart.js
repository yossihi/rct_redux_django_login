import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartAsync, memoizedSelectCart, unBuyAsync } from "./cartSlice";

export function Cart(props) {
  const MyCart = useSelector(memoizedSelectCart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0)

  useEffect(() => {
    dispatch(getCartAsync());
  }, [dispatch, props.myFlag]);

  useEffect(() => {
    let newTotal = 0;
    Object.keys(MyCart).forEach((productId) => {
      const product = MyCart[productId];
      newTotal += product.price * product.quantity;
    });
    setTotal(newTotal);
  }, [MyCart]);

  const handleDelete = async (prodID) => {
    console.log(prodID);
    await dispatch(unBuyAsync(prodID));
    props.setFlag(!props.myFlag);
  };

  return (
    <div style={{margin: '2%'}}>
      <p className="d-inline-flex gap-1">
        <button
          className="btn btn-success collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          style={{ marginTop: "6%" }}
        >
          My Cart: {MyCart.length}
        </button>
      </p>
      <div className="collapse" id="collapseExample">
        <div
          className="card card-body"
          style={{
            maxHeight: "450px",
            overflowX: "auto",
            border: "1px solid",
            borderRadius: "18px",
          }}
        >
          <h5>{MyCart.length} products</h5>
          <h4>Total 2 Pay: {total}</h4>
          {Object.keys(MyCart).map((productId) => {
            const product = MyCart[productId];
            return (
              <div
                key={productId}
                style={{
                  border: "1px solid",
                  borderRadius: "8px",
                  margin: "10px",
                  padding: "5px",
                }}
              >
                <p>
                  Description: {product.desc}
                  <br />
                  Price: ${product.price}
                  <br />
                  Quantity: {product.quantity}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Del
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
