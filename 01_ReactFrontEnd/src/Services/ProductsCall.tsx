import { useState, useEffect } from 'react'
import { Filter } from '../Components/ProductGrid'

export default function ProductsCall(filter:Filter) {
  const [productArray, getProducts] = useState([])
  const API = getAPI(filter)
  const fetchProducts = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
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

function getAPI(filter:Filter){
  if (filter.type === 'None' || filter.type === undefined){
    return 'http://localhost:3000/products';
  }
  if (filter.filter === 'None' || filter.filter === undefined){
    return 'http://localhost:3000/products/filter/?type=' + filter.type
  }
  else {
    return 'http://localhost:3000/products/filter/?type=' + filter.type + '&' + filter.filter
  }
}

