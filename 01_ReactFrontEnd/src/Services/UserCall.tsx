import axios from 'axios'
import { createUserBasket } from './BasketCall'

export async function putProductToBasket(userID: string, pID: number, size: string) {
  return fetch('http://localhost:3000/basket/' + userID + '/?productID=' + pID +'&size=' + size, {
          method: 'PUT',
        }
      )
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
    })
}

export const getUserData = async(inputEmail) => {
  const data = axios
  .get("http://localhost:3000/customer/login/" + inputEmail, {})
  .then(res => {
      console.log(res.data)
      return res.data 
  })
  .catch((error) => {
      console.log(error)
      //alert('Wrong Email');
  })
  return data;
}

export const createUser = async (inputFirstName, inputName, inputEmail, inputPassword, inputAddress) => {
  let customerID = Math.floor((Math.random() * 100000) + 1);
  const data = {
    customerID: customerID,
    fname: inputFirstName,
    lname: inputName,
    email: inputEmail,
    pword: inputPassword,
    addr: inputAddress 
  };
  //POST call to API to create user from input data
   axios
   .post("http://localhost:3000/customer/", data)
   .then(res => console.log(res))
   .catch(err => console.log(err))
   localStorage.setItem("customerID", customerID.toString());
   await createUserBasket(customerID.toString());}
