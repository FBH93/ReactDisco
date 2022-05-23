import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getSingleBasket, removeProductFromBasket } from '../Services/BasketCall'
import { localCartAtom } from './store'

export interface BasketProduct{
  productID: number, 
  productName: string, 
  productPrice: number, 
  style: string, 
  type: string,
  size: string
}

export interface BasketInterface {
  customerID: string,
  products: BasketProduct[]
}


export const Basket = () => {
  const [selectedSize, setProductSize] = useState('')
  const [isAdded, setIsAdded] = useState(false)
  


 let cID = localStorage.getItem('CustomerID')

 const [localCart]=useAtom(localCartAtom)
 
 const [cart, setCart] = useState<BasketProduct[] | null>([])



 useEffect(() => {
    const getBasket = async () => {
      console.log("im doing something")
      const contents = cID? await getSingleBasket(cID): localCart;
      console.log(contents);
     setCart(contents)
    }

    getBasket()
  }, [cID])
   

async function removeFromCart(cID:string, pID:number, size:string): Promise<BasketProduct[]> {
  //add a API call where we remove the item.
  //then get back the updated cart
  await removeProductFromBasket(cID, pID, size);
  let numberCID = parseInt(cID);
  let something: BasketProduct[] = [];
  

  return await getSingleBasket(cID);
}

  const pseudoLogin = (cID: string) => {
    localStorage.setItem('CustomerID', cID)
    window.location.reload()
  }

  const pseudoLogout = () => {
    localStorage.removeItem('CustomerID')
    window.location.reload()
  }


  // const getTotalPrice = () => {
  //   let total: number = 0
  //   cart.forEach((value: string, key: typeProduct) => {
  //     total += key.productPrice
  //   })
  //   return total
  // }

  // const getCartSize = () => {
  //   return cart.size
  // }

  const getImgPathById = (id: number) => {
    return 'assets/img/products/' + id + '.jpg'
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
        <div>{cart?.map(({productID,size, productName, productPrice}) => {

      return(
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
            <img src={getImgPathById(productID)} width="90x" />
          </div>
          <div className="col d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center">
            <h1 className="fs-4" style={{ marginTop: '5px' }}>
              {' '}
              {productName}{' '}
            </h1>
          </div>
          <div className="col d-flex justify-content-center align-items-center align-items-xxl-center">
            <p className="fs-4 fw-light" style={{ marginTop: '12px' }}>
              {productPrice}
            </p>
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <p className="fs-4 fw-light" style={{ marginTop: '12px' }}>
              {size /*this is size*/}
            </p>
          </div>
          <div
            className="col d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center"
            style={{ padding: '25px' }}
          >
            <button
              onClick={async() => {
                const updatedCart = cID?await removeFromCart(cID, productID, size): cart.filter((item)=>item.productID!=productID)
                console.log(updatedCart)
                setCart(updatedCart)}}
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
  }</div>

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
              {cart?.length} items in your cart
            </p>
          </div>
          <div
            className="col d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center"
            style={{ padding: '25px' }}
          >
            <p className="fs-4 fw-bold" style={{ marginTop: '12px' }}>
              Sub-Total: {22} DKK
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
