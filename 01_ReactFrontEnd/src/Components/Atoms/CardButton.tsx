import React, { Component, useState } from 'react'
import { Button } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import { addSyntheticTrailingComment } from 'typescript'
import { Basket } from '../Basket'


export const CardButton = () => {

  const [selectedSize, setSelectedSize] = useState("");

  const addItem = (id:number) => { 
    localStorage.setItem("product" + id, "product, " + selectedSize)
  };

      return (
        <>
          <div className="col">
            <button
              onClick = {(event) => {
                addItem(1)
                alert("Added to basket")
              }} className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{ marginBottom: '25px' }}>Add to cart</button>
          </div>
        </>
      )
}


