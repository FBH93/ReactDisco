import { useState, useEffect } from 'react'
import { BasketInterface, BasketProduct } from '../Components/Basket'

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

function getAPI(cID: string) {
  console.log('calling with id: ' + cID)
  return 'http://localhost:3000/basket/' + cID
}

export async function getSingleBasket(id: any): Promise<BasketProduct[]> {
  return fetch('http://localhost:3000/basket/' + id).then((response) =>
    response.json()
    
  ).then (
    (basket) => basket.products
  )
}

export async function removeProductFromBasket(userID:string, pID:number, size:string)  {
  return fetch('http://localhost:3000/basket/' + userID + '/?productID=' + pID +'&size=' + size, {
          method: 'DELETE',
        }
        ) 
};