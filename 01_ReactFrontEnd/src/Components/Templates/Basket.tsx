import { useEffect } from "react"
import { useState } from "react"
import {
  getSingleBasket,
  removeProductFromBasket,
} from "../../Services/BasketCall"
import { getSingleProduct } from "../../Services/ProductsCall"
import { putProductToBasket, getUserDataById } from "../../Services/UserCall"
import { UserInterface } from "../Organisms/LoginModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

library.add(faTrash)  

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
//used to read every basket item when user is not logged in, and puts the items in the database basket with the corresponding customerID.
export async function exportFromLocal(cID: string, cart: BasketProduct[]) {
  let has_localProducts: Boolean = false
  for (let i = 0; i < localStorage.length; i++) { //read everything in localStorage
    if (localStorage.key(i)!.substring(0, 7) == "product") { //if it is a product
      has_localProducts = true //notify that something is found. 
      localStorage.removeItem(localStorage.key(i)!) //remove the product from localStorage. the "!" is a non-null assertion. Promises this is not null
    }
  }
  if (cart && has_localProducts == true) //if there is a cart and we've some localProducts. See line 34. 
    for (let i = 0; i < cart?.length; i++) {
      try {
        await putProductToBasket(cID, cart[i].productID, cart[i].size) //Puts all the products found in the cart into the database basket associated with the customerID (cID). 
      } catch (error) {
        console.log(error)
      }
    }
}
//returns a cart in the BasketProduct[] format which can read the productIDs from localStorage and gets the relevant info from the database. 
export async function localStorageCart(): Promise<BasketProduct[]> {
  let newCart: BasketProduct[] = [] //the container which gets products appended. 
  let foundSomething: boolean = false

  for (let i = 0; i < localStorage.length; i++) { //goes through localStorage 
    if (localStorage.key(i)?.substring(0, 7) == "product") { //if it is a product
      foundSomething = true //a product is found in localStorage
      let pID = localStorage.key(i)?.substring(7) //get the productID.
      let singleProduct = await getSingleProduct(pID) //get the information from the Product.
      let localSize: string = localStorage //returns product size. 
        .getItem("product" + pID)
        ?.split(", ")[1]!
      let productForBasket: BasketProduct = { //inputs all the relevant method from the product interface into the BasketProduct interface. 
        productID: singleProduct.productID,
        productName: singleProduct.productName,
        productPrice: singleProduct.productPrice,
        style: singleProduct.style,
        type: singleProduct.type,
        size: localSize,
      }
      newCart.push(productForBasket) //pushes the newly created productForBasket into our newCart
    }
  }
  if (foundSomething) { //only happens if we actually found anything. 
    return newCart 
  } else { //if we didn't found any products in localStorage, then we just return a empty basket. 
    let emptyCart: BasketProduct[] = [] 
    return emptyCart
  }
}

export const Basket = () => {
  let cID = localStorage.getItem("customerID") //if the user is logged in, there is a customerID (cID)

  //see TODO at localStorageCart()
  const [cart, setCart] = useState<BasketProduct[] | null>([])
  const [heading, setHeading] = useState(<></>)

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
      if (cart)
        if (cart?.length > 0) { //if there are items in the basket. 
          if (cID) {
            message = await basketHeading() //if the user is logged in, it returns a customized messsage with the user's name. 
          } else {
            message = <div>Let's see what's in your basket. </div> //if not logged in, a static message is shown.
          }
        } else {
          if (cID) { 
            message = await basketHeading() //returns a customized message, with the user's name. 
          } else {
            message = (
              <div>
                Your basket is empty.{" "}
                {/* this href navigates the user back the frontpage. */}
                <a href="/"> 
                  <div className="row text-center">
                    <div className="col">
                      <a href="/">
                        <button
                          className="mt-4 btn btn-dark btn-lg"
                          type="button"
                        >
                          Back to the store
                        </button>
                      </a>
                    </div>
                  </div>
                </a>
              </div>
            )
          }
        }
      setHeading(message)
    }
    getHeading()
  }, [cart])

  //Removes items from localstorage. I don't think this have to be async. Doesn't give any exceptions, it is just verbose. 
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
//removes from the database cart based on which user is logged in. 
  async function removeFromCart(
    cID: string,
    pID: number,
    size: string
  ): Promise<BasketProduct[]> {
    await removeProductFromBasket(cID, pID, size)
    return await getSingleBasket(cID)
  }
//creates the customized heading if the user is logged in. 
  async function basketHeading() {
    let message = <></>
    if (cID) {
      let user: UserInterface = await getUserDataById(cID) //gets info about the user. 
      let firstName: string = user.firstName //takes the first name from the user. 
      if (cart)
        if (cart.length > 0) {
          message = (
            <div>Hello {firstName}. Let's see what's in your basket. </div> //creates JSX with the username. 
          )
        } else {
          message = (
            <div>
              Your basket is empty, {firstName}.{" "}
              {/* this href navigates you back to the frontpage */}
              <a href="/">
                <div className="row text-center">
                  <div className="col">
                    <a href="/">
                      <button
                        className="mt-4 btn btn-dark btn-lg"
                        type="button"
                      >
                        Back to the store
                      </button>
                    </a>
                  </div>
                </div>
              </a>
            </div>
          )
        }
    }
    return message
  }
//function for calculating the total price based on what is in your cart
  function getTotalPrice(): number {
    let total = 0
    {
      cart?.map((item) => { //maps over your cart, and gets the number for each item. Adds them to the "total" variable. 
        total += item.productPrice
      })
    }
    return total
  }
  //takes a productID as a number and uses it for creating a string that is used for creating a path to an image. 
  const getImgPathById = (id: number) => { 
    return "assets/img/products/" + id + ".jpg"
  }
//this part of the jsx creates the surroundings of the basket
  return (
    <div
      className="pb-5 min-vh-100"
      style={{
        width: "100%",
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
        {/* maps over the cart. Uses the properties of the cart, such as productID etc, for creating the basket. These are e.g. used a arguments in other functions or consts */}
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
                    {/* calls a function described further up. */}
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
                  {/* Here a new cart is created, where the specified product is removed. Each of the functions below returns a new and filtered cart */}
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
                    <FontAwesomeIcon icon="trash" />
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
              {/* function described further up.  */}
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
