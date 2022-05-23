import { Component, useState } from "react";
import { basketProduct } from "../Basket";

export function ProductCardBasket(product) {

  const [showProduct, toggleShowProduct] = useState("true")

  

  const thisProductId = product.productID;
  const productName = product.productName;
  const productPrice = product.productPrice;
  const size = product.size;
  const imgPath = "../assets/img/products/" + thisProductId + ".jpg"

  return (
    <div>
      <h3>product goes here</h3>
      <div
        className="row row-cols-1 row-cols-sm-3 row-cols-md-3 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5 justify-content-start"
        style={{
          background: "#ffffff",
          borderRadius: "5px",
          margin: "5px",
          marginBottom: "30px",
        }}
      >
        <div className="col d-flex d-md-flex d-xxl-flex justify-content-center align-items-center justify-content-md-center justify-content-xxl-center align-items-xxl-center">
          <img src={imgPath} width="90x" />
        </div>
        <div className="col d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center">
          <h1 className="fs-4" style={{ marginTop: "5px" }}>
            {" "}
            {productName}{" "}
          </h1>
        </div>
        <div className="col d-flex justify-content-center align-items-center align-items-xxl-center">
          <p className="fs-4 fw-light" style={{ marginTop: "12px" }}>
            {productPrice}
          </p>
        </div>
        <div className="col d-flex justify-content-center align-items-center">
          <p className="fs-4 fw-light" style={{ marginTop: "12px" }}>
            {size}
          </p>
        </div>
        <div
          className="col d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center"
          style={{ padding: "25px" }}
        >
          <button
            onClick={() => alert("removed")}
            className="btn btn-primary"
            type="button"
          >
            <i className="fa fa-trash fs-2" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
