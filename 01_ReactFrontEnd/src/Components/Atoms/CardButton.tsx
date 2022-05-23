import { Component, useState } from 'react'
import { Button } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'

export const CardButton = () => {
  const [isAdded, setIsAdded] = useState(false)

  const alert = () => {
    setIsAdded(true)
  }
  return (
    <>
      <div className="col">
        <Button
          onClick={alert}
          className="btn btn-primary"
          data-bss-hover-animate="pulse"
          type="button"
          style={{ marginBottom: '25px' }}
        >
          Add to cart
        </Button>
      </div>
      {isAdded ? <Alert variant="success"> Added to cart! </Alert> : null}
    </>
  )
}

export default CardButton
