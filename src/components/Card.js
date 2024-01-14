import React from "react";

export default function Card({ img, name, options }) {
  let priceOptions = Object.keys(options);
  console.log(priceOptions);
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={img} className="card-img-top card-img" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div className="container w-100 ">
            <select className="m-2 h-100  bg-success rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-success rounded">
              {priceOptions.map((option) => {
                return (
                  <option value={option} key={option}>
                    {option}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-7">Total price</div>
          </div>
        </div>
      </div>
    </div>
  );
}
