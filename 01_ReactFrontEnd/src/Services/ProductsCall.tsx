import { useState, useEffect } from "react"
import { Filter } from "../Components/ProductGrid"
import type { ProductInterface } from "../Components/Product"

//get products from API
export function getAPI(filter: Filter) {
  //Return all products if no filter
  if (filter.filter1 === "None" || filter.filter1 === undefined) {
    return "http://localhost:3000/products"
  }
  //return products with only filter1
  if (filter.filter2 === "None" || filter.filter2 === undefined) {
    return "http://localhost:3000/products/filter/?" + filter.filter1
  }
  //Return products with both filter parameters
  else {
    return (
      "http://localhost:3000/products/filter/?" +
      filter.filter1 +
      "&" +
      filter.filter2
    )
  }
}

export async function getSingleProduct(id: any): Promise<ProductInterface> {
  return fetch("http://localhost:3000/products/" + id).then((response) =>
    response.json()
  ) // Parse the response in JSON
}
