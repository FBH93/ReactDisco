import { Component, useState } from 'react'
import { Button } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import { addSyntheticTrailingComment } from 'typescript'
import { Basket } from '../Basket'


export const CardButton = () => {

  const [selectedSize, setSelectedSize] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const id = 1;

  const buttonClick = () => {
    //addItem(id)
    setIsAdded(true)
  };

  const addItem = (id:number) => { 
    localStorage.setItem("product" + id, "product, " + selectedSize)
  };


    return (
      <>
          <div className="col">
            <Button onClick = {buttonClick} className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{ marginBottom: '25px' }}>Add to cart</Button></div>
           {isAdded ? <Alert variant="success"> Added to cart! </Alert> : null }
      </>
    )
}


