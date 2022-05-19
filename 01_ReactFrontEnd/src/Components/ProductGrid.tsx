import ProductsCall from '../Services/ProductsCall'
import { product } from '../Components/Product'
import Sizometer from './Atoms/Sizometer'
import CardButton from './Atoms/CardButton'

export type Filter = {
  filter: string;
  type: string;
}

function ProductGrid(filter:Filter) {
  const products = ProductsCall(filter)
  if (products) {
  return (
    <div className="container discoGrid justify-content-center d-flex flex-wrap">
      <>
        {products.map((product, i) => {
          return <div className="discoCard" key={i}>{productToString(product)}</div>
        })}
      </>
    </div>
  )
}
else return (<div> FAULTY FILTER </div>)
}

export function productToString(props: product) {
  return (
        <>
        <a className="shopGridLink" href={"/product.html?id=" + props.productID} style={{ color: '#455f58' }}>
          <h1 id="productName" className="fs-2 text-center">
          {props.productName}
          </h1>
        <img className="mt-5 mb-5" id="productImage" src={"/assets/img/products/" + props.productID + ".jpg"} width="300px" />
        <h1 id="productName-1" className="fs-3 fw-light text-center">
          {props.productPrice + "DKK"}
        </h1>
        </a>
        <Sizometer />
        <CardButton />
      </>
  )};

export default ProductGrid