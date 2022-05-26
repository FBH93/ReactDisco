import { useState } from "react"
import { Alert, Button } from "react-bootstrap"
import { render } from "react-dom"
import { useAtom } from "jotai"
import { cardAlertAtom } from "../store"

export const CardAlert = () => {
  const [show, setShow] = useAtom(cardAlertAtom)

  return (
    <>
      <Alert
        show={show}
        variant="primary"
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      </Alert>
    </>
  )
}
