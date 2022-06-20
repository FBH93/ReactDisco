import { useState, useEffect } from "react"
import { BasketProduct } from "../Components/Templates/Basket"

export default function BasketCall(cID: string) {
  const [basketArray, getBasket] = useState([])
  const API = getAPI(cID)
  const fetchProducts = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        getBasket(res)
      })
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  return basketArray
}
// this probably shouldn't be here. 
function getAPI(cID: string) {
  console.log("calling with id: " + cID)
  return "http://localhost:3000/basket/" + cID
}
//returns a basket based on the corresponding userID (id)
export async function getSingleBasket(id: any): Promise<BasketProduct[]> {
  return fetch("http://localhost:3000/basket/" + id)
    .then((response) => response.json())
    .then((basket) => basket.products)
}
//removes the corresponding item from the corresponding user basket. 
export async function removeProductFromBasket(
  userID: string,
  pID: number,
  size: string
) {
  return fetch(
    "http://localhost:3000/basket/" +
      userID +
      "/?productID=" +
      pID +
      "&size=" +
      size,
    {
      method: "DELETE",
    }
  )
}
//creates a new basket with the corresponding customerID (userID)
export async function createUserBasket(userID: string) {
  return fetch("http://localhost:3000/basket/" + userID, {
    method: "POST",
  })
}
