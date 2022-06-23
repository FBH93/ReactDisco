import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleProduct } from "../../Services/ProductsCall"
import { CardButton } from "../Atoms/CardButton"
import Sizometer from "../Atoms/Sizometer"
import { sizeAtom } from "../store"

// an interface is a type without implementation
// here we are creating an interface for product to declare the certain type of structure that a product has. This means that when using the ProductInterface the constant has to comply with all elements of ProductInterface, meaning it has to match the structure of the interface. If we get something that does not have structure as below, then it is not what we define as a product.
export interface ProductInterface {
  productID: number
  productName: string
  productPrice: number
  style: string
  type: string
  details: string
}

const Product = () => {
  let { id } = useParams() //taking the parameter from the URL so here if productID in the URL is 2 then { id } is 2
  const [selectedSize] = useAtom(sizeAtom)

  // Has to match the structure of the interface. Starting state is null. This will be updated to a product when we get a prodyctID.
  const [myProduct, setMyProduct] = useState<ProductInterface | null>(null)

  useEffect(() => {
    const updateProduct = async () => {
      //expecting a promise
      const myProduct = await getSingleProduct(id) // awaiting the promise resolved by the getSingleProduct method
      setMyProduct(myProduct) //myProduct now exists of the json data of ONE product with id asked for
    }
    updateProduct()
  }, [id]) //useEffect is a Hook that the React remembers the function and executes after the render which here shows the product with id asked for above

  if (!id) {
    return <>Error</>
  }

  return (
    <div>
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col">
            <div
              id="discoProductImage"
              style={{
                background:
                  'url("../assets/img/products/' + id + '.jpg") no-repeat',
                backgroundSize: "contain",
                height: "512px",
              }}
            />
          </div>
          <div className="col mt-5">
            <h2 id="discoProductName">{myProduct?.productName}</h2>{" "}
            {/* the ? will return and undefined if myProduct is null */}
            <div className="row">
              <div className="col">
                <p> {myProduct?.details} </p>
                <h4
                  id="discoProductPrice"
                  style={{ marginBottom: "25px", marginTop: "25px" }}
                >
                  {myProduct?.productPrice} DKK
                </h4>
                <Sizometer />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <CardButton pID={parseInt(id)} size={selectedSize} />{" "}
                {/** sizeometer and cardbutton could have been combined as a molecule because we never use them individually */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
