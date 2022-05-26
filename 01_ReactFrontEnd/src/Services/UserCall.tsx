import axios from 'axios'
import { UserInterface } from '../Components/Atoms/LoginModal'

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
      alert('Wrong Email');
  })
  return data;
}

export async function getUserDataById(id: any): Promise<UserInterface> {
  return fetch('http://localhost:3000/customer/' + id).then((response) =>
    response.json()
  ) // Parse the response in JSON
}
