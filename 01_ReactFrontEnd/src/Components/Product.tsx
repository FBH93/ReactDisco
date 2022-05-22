import { useState } from "react";
import { useParams } from "react-router-dom";

//Product type based on JSON
export type product = {
  productID: number,
  productName : string,
  productPrice : number,
  style : string,
  type : string
};

export const Product = () => {

  const [selectedSize, setProductSize] = useState("");
  //const { id } = parseInt(useParams();
  var { id } = useParams();
  
  const products = [
    { productID: 1, productName: "Disco pants", productPrice: 899, style: "Sportswear", type: "pants", details: "You will be hip and fash with these rocking disco pants!"},
    { productID: 2, productName: "Disco jacket", productPrice: 349, style: "Sportswear", type: "jackets", details: "The perfect jacket for running or disco dancing"},
    { productID: 3, productName: "Disco headband", productPrice: 149, style: "Sportswear", type: "accesories", details: ""},
    { productID: 4, productName: "Disco bumper", productPrice: 299, style: "Sportswear", type: "jackets", details: ""},
    { productID: 5, productName: "Disco tights", productPrice: 400, style: "70s", type: "pants", details: ""},
    { productID: 6, productName: "Disco shirt flower", productPrice: 400, style: "70s", type: "shirt", details: ""},
    { productID: 7, productName: "Disco shirt more flower", productPrice: 400, style: "Space", type: "shirt", details: ""},
    { productID: 8, productName: "Disco shirt tight", productPrice: 400, style: "Space", type: "shirt", details: ""},
    { productID: 9, productName: "Disco top", productPrice: 400, style: "70s", type: "shirt", details: ""},
    { productID: 10, productName: "Disco oversized shirt", productPrice: 400, style: "80s", type: "shirt", details: ""},
    { productID: 11, productName: "Disco glitter shirt", productPrice: 400, style: "Space", type: "shirt", details: ""},
    { productID: 12, productName: "Disco space t-shirt", productPrice: 549, style: "Space", type: "shirt", details: ""},
    { productID: 13, productName: "Disco bra", productPrice: 350, style: "Space", type: "accessories", details: ""},
    { productID: 14, productName: "Disco space dress", productPrice: 400, style: "Space", type: "shirt", details: ""},
    { productID: 15, productName: "Disco space pants", productPrice: 200, style: "Space", type: "pants", details: ""},
  ];

  const errors = {
    product: "product not found",
  };

  const getNameById = (id:number) => {
    let prod = products.find((product) => product.productID === id)
    return prod ? prod.productName : errors.product
  };

  const getPriceById = (id:number) => {
    let prod = products.find((product) => product.productID === id) 
    return prod ? prod.productPrice + " DKK" : errors.product
  };

  const getDescById = (id:number) => {
    let prod = products.find((product) => product.productID === id) 
    return prod ? prod.details : errors.product
  };

  const addItem = (id:number) => { 
    localStorage.setItem("product" + id, "product, " + selectedSize)
  };
 
  return (
    <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div id="discoProductImage" style={{background: 'url("../assets/img/products/' + id + '.jpg") no-repeat', backgroundSize: 'contain', height: '512px'}} />
            </div>
            <div className="col mt-5">
              <h2 id="discoProductName">{getNameById(id)}</h2>
              <p id="discoProductDesc">{getDescById(id)}</p>
              <div className="row">
                <div className="col"><div className="btn-group btn-group-toggle" style={{paddingBottom: '16px'}} data-toggle="buttons">
                  <label className="btn btn-secondary">
                    <input type="radio" name="size" id="S" autoComplete="off" onClick={(event) => {setProductSize("S")}} defaultChecked /> S
                  </label>
                  <label className="btn btn-secondary">
                    <input type="radio" name="size" id="M" autoComplete="off" onClick={(event) => {setProductSize("M")}} /> M
                  </label>
                  <label className="btn btn-secondary">
                    <input type="radio" name="size" id="L" autoComplete="off" onClick={(event) => {setProductSize("L")}}/> L
                  </label>
                  <label className="btn btn-secondary">
                    <input type="radio" name="size" id="XL" autoComplete="off" onClick={(event) => {setProductSize("XL")}} /> XL
                  </label>
                  </div>
                  <h2 id="discoProductPrice" style={{ marginBottom: '25px', marginTop: '25px' }}>{getPriceById(id)}</h2>
                </div>
              </div>
              <div className="row">
                <div className="col"><button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" onClick={(event) => addItem(id)} style={{ marginBottom: '25px' }}>Add to cart</button></div>
              </div>
              <div className="alert alert-success cartInfo" role="alert"><span><strong>The item has been added to your card.</strong></span></div>
            </div>
          </div>
        </div>
      </div>
  )
};

export default Product