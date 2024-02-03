import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card({ foodItem, options }) {
  let dispatch = useDispatchCart();
  let priceOptions = Object.keys(options);
  const priceRef = useRef();
  let { img, name, _id, price } = foodItem;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let data = useCart();

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      }
    }
    await dispatch({ type: "ADD", _id, img, name, qty, size, finalPrice });
    console.log(data);
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={img} className="card-img-top card-img" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div className="container w-100 ">
            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => {
                setSize(e.target.value);
                console.log(size);
              }}
            >
              {priceOptions.map((option) => {
                return (
                  <option value={option} key={option}>
                    {option}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-7">₹{finalPrice}</div>
          </div>
          <hr />
          <button
            className={`btn btn-success justify-center ms-2`}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
