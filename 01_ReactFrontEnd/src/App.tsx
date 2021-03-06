import "../src/custom.scss"
import React from "react"
import { NavigationBar } from "./Components/Templates/Navbar"
import { Basket } from "./Components/Templates/Basket"
import ProductGrid from "./Components/Templates/ProductGrid"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./Components/Templates/Product"
import { Home } from "./Components/Templates/Home"

//App renders all content on the website.
//The router determines what components are shown, based on the path chosen.

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div>
            <NavigationBar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                  </>
                }
              />
              <Route
                path="/products"
                element={<ProductGrid filter1={"None"} filter2={"None"} />}
              />
              <Route
                path="/products/70s"
                element={<ProductGrid filter1={"style=70s"} filter2={"None"} />}
              />
              <Route
                path="/products/80s"
                element={<ProductGrid filter1={"style=80s"} filter2={"None"} />}
              />
              <Route
                path="/products/sportswear"
                element={
                  <ProductGrid filter1={"style=sportswear"} filter2={"None"} />
                }
              />
              <Route
                path="/products/space"
                element={
                  <ProductGrid filter1={"style=space"} filter2={"None"} />
                }
              />
              <Route
                path="/products/shirts"
                element={
                  <ProductGrid filter1={"type=shirt"} filter2={"None"} />
                }
              />
              <Route
                path="/products/pants"
                element={
                  <ProductGrid filter1={"type=pants"} filter2={"None"} />
                }
              />
              <Route
                path="/products/jackets"
                element={
                  <ProductGrid filter1={"type=jackets"} filter2={"None"} />
                }
              />
              <Route
                path="/products/accessories"
                element={
                  <ProductGrid filter1={"type=accessories"} filter2={"None"} />
                }
              />
              <Route
                path="/products/premium"
                element={
                  <ProductGrid filter1={"price=premium"} filter2={"None"} />
                }
              />
              <Route
                path="/products/discount"
                element={
                  <ProductGrid filter1={"price=discount"} filter2={"None"} />
                }
              />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/basket" element={<Basket />} />
            </Routes>
          </div>
        </BrowserRouter>
      </>
    )
  }
}

export default App
