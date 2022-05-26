import axios from "axios"
import { UserInterface } from "../Components/Organisms/LoginModal"
import { createUserBasket  } from "./BasketCall"
import { localStorageCart, exportFromLocal } from '../Components/Templates/Basket'

export async function putProductToBasket(
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
      method: "PUT",
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
    })
}

export const getUserData = async (inputEmail) => {
  const data = axios
    .get("http://localhost:3000/customer/login/" + inputEmail, {})
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((error) => {
      console.log(error)
    })
  return data
}

export const createUser = async (
  inputFirstName,
  inputName,
  inputEmail,
  inputPassword,
  inputAddress
) => {
  let customerID = Math.floor(Math.random() * 100000 + 1)

  const data = {
    customerID: customerID.toString(),
    fname: inputFirstName,
    lname: inputName,
    email: inputEmail,
    pword: inputPassword,
    addr: inputAddress,
  }
  //POST call to API to create user from input data
  axios
    .post("http://localhost:3000/customer/", data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  localStorage.setItem("customerID", customerID.toString())
  localStorage.setItem("firstName", inputFirstName)
  localStorage.setItem("lastName", inputName)
  localStorage.setItem("email", inputEmail)
  localStorage.setItem("address", inputAddress)
  localStorage.setItem("isLoggedIn", "true")
  await createUserBasket(customerID.toString())
  await exportFromLocal(data.customerID, await localStorageCart())
}

export async function getUserDataById(id: any): Promise<UserInterface> {
  return fetch("http://localhost:3000/customer/" + id).then((response) =>
    response.json()
  ) // Parse the response in JSON
}
