import React from 'react'
import { useState } from 'react'
import BasketCall from '../Services/BasketCall'

export type typeBasket = {
  customerID: string
  products: Array<Object>
}

export const Basket = () => {
  const [selectedSize, setProductSize] = useState('')
  const [isAdded, setIsAdded] = useState(false)

  type typeProduct = {
    productID: number
    productName: string
    productPrice: number
    style: string
    type: string
    details: string
  }

  const products: Array<typeProduct> = [
    {
      productID: 1,
      productName: 'Disco pants',
      productPrice: 899,
      style: 'Sportswear',
      type: 'pants',
      details: 'You will be hip and fash with these rocking disco pants!',
    },
    {
      productID: 2,
      productName: 'Disco jacket',
      productPrice: 349,
      style: 'Sportswear',
      type: 'jackets',
      details: 'The perfect jacket for running or disco dancing',
    },
    {
      productID: 3,
      productName: 'Disco headband',
      productPrice: 149,
      style: 'Sportswear',
      type: 'accesories',
      details: 'For the real headbangers out there.',
    },
    {
      productID: 4,
      productName: 'Disco bumper',
      productPrice: 299,
      style: 'Sportswear',
      type: 'jackets',
      details: 'Who are you bumping in to? ',
    },
    {
      productID: 5,
      productName: 'Disco tights',
      productPrice: 400,
      style: '70s',
      type: 'pants',
      details: '',
    },
    {
      productID: 6,
      productName: 'Disco shirt flower',
      productPrice: 400,
      style: '70s',
      type: 'shirt',
      details: '',
    },
    {
      productID: 7,
      productName: 'Disco shirt more flower',
      productPrice: 400,
      style: 'Space',
      type: 'shirt',
      details: '',
    },
    {
      productID: 8,
      productName: 'Disco shirt tight',
      productPrice: 400,
      style: 'Space',
      type: 'shirt',
      details: '',
    },
    {
      productID: 9,
      productName: 'Disco top',
      productPrice: 400,
      style: '70s',
      type: 'shirt',
      details: '',
    },
    {
      productID: 10,
      productName: 'Disco oversized shirt',
      productPrice: 400,
      style: '80s',
      type: 'shirt',
      details: '',
    },
    {
      productID: 11,
      productName: 'Disco glitter shirt',
      productPrice: 400,
      style: 'Space',
      type: 'shirt',
      details: '',
    },
    {
      productID: 12,
      productName: 'Disco space t-shirt',
      productPrice: 549,
      style: 'Space',
      type: 'shirt',
      details: '',
    },
    {
      productID: 13,
      productName: 'Disco bra',
      productPrice: 350,
      style: 'Space',
      type: 'accessories',
      details: '',
    },
    {
      productID: 14,
      productName: 'Disco space dress',
      productPrice: 400,
      style: 'Space',
      type: 'shirt',
      details: '',
    },
    {
      productID: 15,
      productName: 'Disco space pants',
      productPrice: 200,
      style: 'Space',
      type: 'pants',
      details: '',
    },
  ]

  let cart: Map<typeProduct, string> = new Map<typeProduct, string>()

  function fillCart() {
    //TODO: make a fillCart version, that reads from API

    //if not logged in. make an if statement
    if (localStorage.getItem('CustomerID')) {
      console.log('logged in')
      let contents: typeBasket
      let cID = localStorage.getItem('CustomerID')
      if (cID) {
        console.log(BasketCall(cID))
      }
    } else {
      for (let i = 0; i < localStorage.length; i++) {
        console.log('loop runs' + localStorage.length)
        let productID = localStorage.key(i)
        console.log('productID: ' + productID)
        let splitted
        if (productID) {
          if (localStorage.getItem(productID)) {
            splitted = localStorage.getItem(productID)?.split(', ')
          }
        }

        if (splitted)
          if (splitted[0] == 'product') {
            console.log('second if works')
            let thisProduct
            for (let i = 0; i < products.length; i++) {
              console.log(
                'number 3 productID = ' +
                  productID?.substring(7) +
                  ' products[i].productID = ' +
                  products[i].productID
              )
              if (productID)
                if (parseInt(productID.substring(7)) == products[i].productID) {
                  console.log('number 4')
                  thisProduct = products[i]
                  console.log(thisProduct.productName)
                }
            }
            let size: string = splitted[1]
            if (thisProduct) {
              cart.set(thisProduct, size)
            }
          }
      }
    }
  }

  const pseudoLogin = (cID: string) => {
    localStorage.setItem('CustomerID', cID)
  }

  const pseudoLogout = () => {
    localStorage.removeItem('CustomerID')
  }

  const errors = {
    product: 'product not found',
  }

  const getNameById = (id: number) => {
    let prod = products.find((product) => product.productID === id)
    return prod ? prod.productName : errors.product
  }

  const getPriceById = (id: number) => {
    let prod = products.find((product) => product.productID === id)
    return prod ? prod.productPrice + ' DKK' : errors.product
  }

  const getDescById = (id: number) => {
    let prod = products.find((product) => product.productID === id)
    return prod ? prod.details : errors.product
  }

  const addItem = (id: number) => {
    localStorage.setItem('product' + id, 'product, ' + selectedSize)
  }

  const itemToCart = (id: number) => {
    addItem(id)
    setIsAdded(true)
  }

  const getTotalPrice = () => {
    let total: number = 0
    cart.forEach((value: string, key: typeProduct) => {
      total += key.productPrice
    })
    return total
  }

  const getCartSize = () => {
    return cart.size
  }

  const getImgPathById = (id: number) => {
    return 'assets/img/products/' + id + '.jpg'
  }

  function removeFromCart(id: number) {
    let removingProduct: typeProduct
    let found: boolean = false
    cart.forEach((value: string, key: typeProduct) => {
      if (key.productID == id) {
        found = true
        removingProduct = key
        cart.delete(removingProduct)
      }
    })

    if (found) {
      //overvej at brug state i stedet for dette. Det her er en hurtig løsning.
      window.location.reload()
      //if not logged in, remove from localstorage as well
      if (true) {
        //replace this with some boolean var named "loggedIn = false"
        localStorage.removeItem('product' + id)
      }
      //TODO: make another if that "loggedIn = true", should remove from basket where customerID matches
    }
  }

  //TODO make an exportCart function that exports cart from localStorage and uploads the basket into the API with the fitting customerID.

  //function for dynamically inserting products. Start with 1 product. Start with

  const listItems = () => {
    fillCart()
    let buffer: JSX.Element[] = []
    console.log('listItems runs')

    cart.forEach((value: string, key: typeProduct) => {
      let thisProduct: typeProduct = key
      let thisProductId: number = thisProduct.productID

      buffer.push(
        <div
          className="row row-cols-1 row-cols-sm-3 row-cols-md-3 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5 justify-content-start"
          style={{
            background: '#ffffff',
            borderRadius: '5px',
            margin: '5px',
            marginBottom: '30px',
          }}
        >
          <div className="col d-flex d-md-flex d-xxl-flex justify-content-center align-items-center justify-content-md-center justify-content-xxl-center align-items-xxl-center">
            <img src={getImgPathById(thisProductId)} width="90x" />
          </div>
          <div className="col d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center">
            <h1 className="fs-4" style={{ marginTop: '5px' }}>
              {' '}
              {getNameById(thisProductId)}{' '}
            </h1>
          </div>
          <div className="col d-flex justify-content-center align-items-center align-items-xxl-center">
            <p className="fs-4 fw-light" style={{ marginTop: '12px' }}>
              {getPriceById(thisProductId)}
            </p>
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <p className="fs-4 fw-light" style={{ marginTop: '12px' }}>
              {value /*this is size*/}
            </p>
          </div>
          <div
            className="col d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center"
            style={{ padding: '25px' }}
          >
            <button
              onClick={() => removeFromCart(thisProductId)}
              className="btn btn-primary"
              type="button"
            >
              <i className="fa fa-trash fs-2" />
              Remove
            </button>
          </div>
        </div>
      )
    })

    return buffer
  }

  return (
    <div
      style={{
        width: '100%',
        height: '90vh',
        marginBottom: '50px',
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0))',
      }}
    >
      <div
        className="container d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center"
        style={{ height: '30vh' }}
      >
        <div className="row">
          <div className="col">
            <h1
              className="fs-1 fw-light text-center text-white"
              id="cartHeadline"
            >
              Let's see what's in your basket.
            </h1>
          </div>
        </div>
      </div>
      <div className="container" id="discoCartContent">
        {/* insert products here */}
        <div>{listItems()}</div>

        <div
          className="row row-cols-1 row-cols-sm-3 row-cols-md-3 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5 justify-content-start"
          style={{
            background: '#ffffff',
            borderRadius: '5px',
            margin: '5px',
            marginBottom: '30px',
          }}
        >
          <div className="col d-flex d-md-flex d-xxl-flex justify-content-center align-items-center justify-content-md-center justify-content-xxl-center align-items-xxl-center" />
          <div className="col d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center" />
          <div className="col d-flex justify-content-center align-items-center align-items-xxl-center" />
          <div className="col d-flex justify-content-center align-items-center">
            <p className="fs-4 fw-light" style={{ marginTop: '12px' }}>
              {getCartSize()} items in your cart
            </p>
          </div>
          <div
            className="col d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center"
            style={{ padding: '25px' }}
          >
            <p className="fs-4 fw-bold" style={{ marginTop: '12px' }}>
              Sub-Total: {getTotalPrice()} DKK
            </p>
          </div>
        </div>
      </div>
      {/* delete the two buttons below later */}
      <div className="testLogin">
        {' '}
        <button
          onClick={() => pseudoLogin('1')}
          className="btn btn-primary"
          type="button"
        >
          test log in
        </button>{' '}
      </div>
      <div className="testLogout">
        {' '}
        <button
          onClick={() => pseudoLogout()}
          className="btn btn-primary"
          type="button"
        >
          test log out
        </button>{' '}
      </div>
      <div className="container" id="discoSaleButtonContent" />
    </div>
  )
}

export default Basket
