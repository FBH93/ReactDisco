import { useState, useEffect } from 'react'
import { typeBasket } from '../Components/Basket'

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
  
  return (
    basketArray
  )

}

function getAPI(cID: string){
    console.log("calling with id: " + cID)
    return 'http://localhost:3000/basket/'+cID;
  
}

