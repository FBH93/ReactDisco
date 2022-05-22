import { useState, useEffect } from 'react'
import { Filter } from '../Components/ProductGrid'

export default function ProductsCall(filter:Filter) {
  const [productArray, getProducts] = useState([])
  const API = getAPI(filter)
  const fetchProducts = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        console.log(res) //This prints twice, for some reason??
        getProducts(res)
      })
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    productArray
  )

}

  //get products from API
function getAPI(filter:Filter){
    //Return all products if no filter
  if (filter.filter1 === 'None' || filter.filter1 === undefined){
    return 'http://localhost:3000/products';
  }
    //return products with only filter1
  if (filter.filter2 === 'None' || filter.filter2 === undefined){
    return 'http://localhost:3000/products/filter/?type=' + filter.filter1
  }
    //Return products with both filter parameters
  else {
    return 'http://localhost:3000/products/filter/?type=' + filter.filter1 + '&' + filter.filter2
  }
}

