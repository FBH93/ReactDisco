import { useState, useEffect } from 'react'
import { NumericLiteral } from 'typescript'

//get products from API
function getUserFromAPI(email: string) {
  return 'http://localhost:3000/customer/' + email
}

export function putProductToBasket(userID: string, pID: number, size: string) {
  return fetch(
    'http://localhost:3000/basket/' +
      userID +
      '/?productID=' +
      pID +
      '&size=' +
      size
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
    })
}
