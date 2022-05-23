import { useState, useEffect } from 'react'
import { NumericLiteral } from 'typescript'

export default function usersCall(userID:number) {
  const [user, getUser] = useState([])
  const API = getUserFromAPI(userID)
  const fetchUser = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        console.log(res) //This prints twice, for some reason??
        getUser(res)
      })
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    user
  )

}

  //get products from API
function getUserFromAPI(userID:number){
   return 'http://localhost:3000/customer/' + userID
}

export function putProductToBasket(userID:string, pID:number, size:string)  {
  return fetch('http://localhost:3000/basket/' + userID + '/?productID=' + pID +'&size=' + size)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
        })
};