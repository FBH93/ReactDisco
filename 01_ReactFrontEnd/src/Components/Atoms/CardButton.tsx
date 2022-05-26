import React, { Component, useState } from "react"
import { Button } from "react-bootstrap"
import { putProductToBasket } from "../../Services/UserCall"

type CardButtonProps = {
  pID: number
  size: string
}

export const CardButton: React.FC<CardButtonProps> = ({ pID, size }) => {
  const addItem = (pID: number, size: string) => {
    if (localStorage.getItem("customerID")) {
      let cID = localStorage.getItem("customerID")
      if (cID) {
        putProductToBasket(cID, pID, size)
      }
    } else {
      localStorage.setItem("product" + pID, "product, " + size)
    }
  }

  return (
    <>
      <div className="col text-center">
        <Button
          variant="primary"
          className="my-3"
          onClick={(event) => {
            addItem(pID, size)
            alert("Added to basket")
          }}
        >
          Add to cart
        </Button>
      </div>
    </>
  )
}
