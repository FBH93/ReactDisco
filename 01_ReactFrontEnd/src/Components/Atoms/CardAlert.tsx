import { useRef } from "react"
import { Alert, Modal, Overlay } from "react-bootstrap"
import { useAtom } from "jotai"
import { cardAlertAtom } from "../store"

export const CardAlert = () => {
  const [show, setShow] = useAtom(cardAlertAtom)
  const target = useRef(null)

  return (
    <div onClick={() => setShow(false)}>
      <Modal show={show}>
        <Alert
          show={show}
          variant="success"
          onClose={() => setShow(false)}
          style={{
            position: "absolute",
          }}
          dismissible
        >
          Success! You added an item to your basket, have fun with your new
          DiscoClothing
        </Alert>
      </Modal>
    </div>
  )
}
