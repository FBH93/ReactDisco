import { useAtom } from "jotai"
import { ReactElement, ReactNode, useEffect } from "react"
import { useState } from "react"
import {
  getSingleBasket,
  removeProductFromBasket,
  createUserBasket,
} from "../Services/BasketCall"
import { localCartAtom } from "./store"
import { getSingleProduct } from "../Services/ProductsCall"
import { putProductToBasket, getUserDataById } from "../Services/UserCall"
import { UserInterface } from "./Atoms/LoginModal"
import { JsxEmit } from "typescript"

export interface BasketProduct {
  productID: number
  productName: string
  productPrice: number
  style: string
  type: string
  size: string
}

export interface BasketInterface {
  customerID: string
  products: BasketProduct[]
}

function testlogger(str: string) {
  console.log(str)
}

export async function exportFromLocal(cID: string, cart: BasketProduct[]) {
  let has_localProducts: Boolean = false
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)!.substring(0, 7) == "product") {
      has_localProducts = true
      localStorage.removeItem(localStorage.key(i)!)
    }
  }
  if (cart && has_localProducts == true)
    for (let i = 0; i < cart?.length; i++) {
      console.log(
        "cID= " +
          cID +
          "productid: " +
          cart[i].productID +
          "size: " +
          cart[i].size
      )
      try {
        await putProductToBasket(cID, cart[i].productID, cart[i].size)
      } catch (error) {
        console.log(error)
      }
    }
}

export async function localStorageCart(): Promise<BasketProduct[]> {
  let newCart: BasketProduct[] = []
  let foundSomething: boolean = false

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)?.substring(0, 7) == "product") {
      foundSomething = true
      let pID = localStorage.key(i)?.substring(7)
      let singleProduct = await getSingleProduct(pID)
      let localSize: string = localStorage
        .getItem("product" + pID)
        ?.split(", ")[1]!
      let productForBasket: BasketProduct = {
        productID: singleProduct.productID,
        productName: singleProduct.productName,
        productPrice: singleProduct.productPrice,
        style: singleProduct.style,
        type: singleProduct.type,
        size: localSize,
      }
      newCart.push(productForBasket)
    }
  }
  if (foundSomething) {
    return newCart
  } else {
    let emptyCart: BasketProduct[] = []
    return emptyCart
  }
}

export const Basket = () => {
  let cID = localStorage.getItem("customerID")

  //see TODO at localStorageCart()
  const [localCart] = useAtom(localCartAtom)
  const [cart, setCart] = useState<BasketProduct[] | null>([])
  const [heading, setHeading] = useState(<></>)
  const [totalPrice, setPrice] = useState<{ totalPrice: number }>()

  useEffect(() => {
    const getBasket = async () => {
      const contents = cID
        ? await getSingleBasket(cID)
        : await localStorageCart()
      setCart(contents)
    }
    getBasket()
  }, [cID])

  useEffect(() => {
    const getHeading = async () => {
      let message = <></>
      if(cart)if(cart?.length>0){
        message = await basketHeading()
      }
      
      
      setHeading(message)
    }
    getHeading()
  }, [cart])

  async function removeFromLocalCart(pID: number): Promise<BasketProduct[]> {
    let foundItem: string = ""
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)?.substring(7) == pID.toString()) {
        foundItem = "product" + pID
      }
    }
    localStorage.removeItem(foundItem)
    return localStorageCart()
  }

  async function removeFromCart(
    cID: string,
    pID: number,
    size: string
  ): Promise<BasketProduct[]> {
    await removeProductFromBasket(cID, pID, size)
    return await getSingleBasket(cID)
  }

  async function pseudoLogin(cID: string) {
    localStorage.setItem("customerID", cID)
    await exportFromLocal(cID, cart!)
    window.location.reload()
  }

  const pseudoLogout = () => {
    localStorage.removeItem("customerID")
    window.location.reload()
  }

  async function basketHeading() {
    let message = <></>
    if(cID){
      let user:UserInterface = await getUserDataById(cID);
      let firstName:string = user.firstName;
      if (cart) if(cart.length > 0){
        message = <div>Hello {firstName}. Let's see what's in your basket. </div>
      }
      else{
        message = <div>Your basket is empty, {firstName}. <a href = "/">Let's go shopping</a></div>
      }
    }
    else{
      if (cart) if(cart.length != 0){
        message = <div>Let's see what's in your basket. </div>
      }
      else{
        message = <div>Your basket is empty. <a href = "/">Let's go shopping</a></div>
      }
    }
    return message
  }

  function getTotalPrice(): number {
    let total = 0
    {
      cart?.map((item) => {
        total += item.productPrice
      })
    }
    return total
  }

  const getImgPathById = (id: number) => {
    return "assets/img/products/" + id + ".jpg"
  }

  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
        marginBottom: "50px",
        background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0))",
        backgroundImage: "url(/assets/img/content/img-account.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div
        className="container d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center"
        style={{ height: "30vh" }}
      >
        <div className="row">
          <div className="col">
            <h1
              className="fs-1 fw-light text-center text-white"
              id="cartHeadline"
            >
              {heading}
            </h1>
          </div>
        </div>
      </div>
      <div className="container" id="discoCartContent">
        {/* insert products here */}
        <div>
          {cart?.map(({ productID, size, productName, productPrice }, i) => {
            return (
              <div
                key={i}
                className="row row-cols-1 row-cols-sm-3 row-cols-md-3 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5 justify-content-start"
                style={{
                  background: "#ffffff",
                  borderRadius: "5px",
                  margin: "5px",
                  marginBottom: "30px",
                }}
              >
                <div className="col d-flex d-md-flex d-xxl-flex justify-content-center align-items-center justify-content-md-center justify-content-xxl-center align-items-xxl-center">
                  <a href={"/products/" + productID}>
                    <img src={getImgPathById(productID)} width="90x" />{" "}
                  </a>
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
                    {size /*this is size*/}
                  </p>
                </div>
                <div
                  className="col d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center"
                  style={{ padding: "25px" }}
                >
                  <button
                    onClick={async () => {
                      const updatedCart = cID
                        ? await removeFromCart(cID, productID, size)
                        : await removeFromLocalCart(productID)
                      setCart(updatedCart)
                    }}
                    className="btn btn-primary"
                    type="button"
                  >
                    <i className="fa fa-trash fs-2" />
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className="row row-cols-1 row-cols-sm-3 row-cols-md-3 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5 justify-content-start"
          style={{
            background: "#ffffff",
            borderRadius: "5px",
            margin: "5px",
            marginBottom: "30px",
          }}
        >
          <div className="col d-flex d-md-flex d-xxl-flex justify-content-center align-items-center justify-content-md-center justify-content-xxl-center align-items-xxl-center" />
          <div className="col d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center" />
          <div className="col d-flex justify-content-center align-items-center align-items-xxl-center" />
          <div className="col d-flex justify-content-center align-items-center">
            <p className="fs-5 fw-light" style={{ marginTop: "12px" }}>
              {cart?.length} items in your cart
            </p>
          </div>
          <div
            className="col d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center"
            style={{ padding: "25px" }}
          >
            <p className="fs-5 fw-bold" style={{ marginTop: "12px" }}>
              Sub-Total: {getTotalPrice()} DKK
            </p>
          </div>
        </div>
      </div>
      <div className="container" id="discoSaleButtonContent" />
    </div>
  )
}

export default Basket
