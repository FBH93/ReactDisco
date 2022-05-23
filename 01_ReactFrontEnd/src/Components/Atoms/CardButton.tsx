import React, { Component, useState } from 'react'
import { Button } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import { addSyntheticTrailingComment } from 'typescript'
import { Basket } from '../Basket'
import { putProductToBasket } from '../../Services/UserCall'

type CardButtonProps = {
  pID: number
  size: string
}

export const CardButton: React.FC<CardButtonProps> = ({ pID, size }) => {
  const addItem = (pID: number, size: string) => {
    if (localStorage.getItem('CustomerID')) {
      let cID = localStorage.getItem('CustomerID')
      if (cID) {
        putProductToBasket(cID, pID, size)
      }
    } else {
      localStorage.setItem('product' + pID, 'product, ' + size)
    }
  }

  return (
    <>
      <div className="row text-center">
        <button
          onClick={(event) => {
            addItem(pID, size)
            alert('Added to basket')
          }}
          className="btn btn-primary"
          data-bss-hover-animate="pulse"
          type="button"
          style={{ marginBottom: '25px' }}
        >
          Add to cart
        </button>
      </div>
    </>
  )
}
