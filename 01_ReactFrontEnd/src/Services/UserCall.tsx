import { useState, useEffect } from 'react'
import { NumericLiteral } from 'typescript'

export interface customer {
  customerId: string
  firstName: string
  lastName: string
  password: string
  email: string
  address: string
}
//get products from API
export function getUserFromAPI(email: string) {
  return fetch( 'http://localhost:3000/customer/' + email)
    .then((res) => res.json())
    .then((res) => {console.log(res)})
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




/*
export function getUserNameFromEmail(email: string) {
  let user = getUserFromAPI(email)
  return user
}
*/