import { ProductInterface } from "../Components/Product"
import Sizometer from "./Atoms/Sizometer"
import { useState, useEffect } from "react"
import { CardButton } from "./Atoms/CardButton"
import { Alert, Card } from "react-bootstrap"
import { getAPI } from "../Services/ProductsCall"
import { useAtom } from "jotai"
import { sizeAtom } from "./store"

export type Filter = {
  filter1: string
  filter2: string
}

function ProductGrid(filter: Filter, props) {
  const [products, setProducts] = useState<ProductInterface[]>([])
  const [selectedSize, setproductize] = useAtom(sizeAtom)

  const API = getAPI(filter)
  console.log(API)

  useEffect(() => {
    const fetchProducts = async () => {
      fetch(API, { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
          console.log(res) //This prints twice, for some reason??
          setProducts(res)
        })
    }
    fetchProducts()
  }, [API])

  if (products) {
    return (
      <Card bg="light" border="dark">
          <div className="container discoGrid justify-content-center d-flex flex-wrap mt-5">
            {products.map((product, i) => {
              return (
                <Card
                  className="text-center"
                  bg="light"
                  border="light"
                  style={{ width: "18rem", margin: "5px" }}
                >
                  <a
                    className="shopGridLink"
                    href={"/products/" + product.productID}
                    style={{ color: "#455f58" }}
                  >
                    <Card.Img
                      variant="top"
                      src={"/assets/img/products/" + product.productID + ".jpg"}
                    />
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Subtitle>
                      {product.productPrice + " DKK"}
                    </Card.Subtitle>
                  </a>
                  <CardButton pID={product.productID} size={selectedSize} />
                  <Sizometer />
                </Card>
              )
            })}
          </div>
      </Card>
    )
  } else return <div> FAULTY FILTER </div>
}

export default ProductGrid

/*
 <img
                    className="mt-5 mb-5"
                    id="productImage"
                    src={'/assets/img/products/' + product.productID + '.jpg'}
                    alt-text="productImage"
                    width="300px"
                  />
*/
