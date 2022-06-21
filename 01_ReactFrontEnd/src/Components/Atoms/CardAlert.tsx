import { Alert, Modal } from "react-bootstrap"
import { useAtom } from "jotai"
import { cardAlertAtom } from "../store"

//Displays the successfull message for adding an item into the shopping basket
export const CardAlert = () => {
  const [show, setShow] = useAtom(cardAlertAtom)

  return (
    <div onClick={() => setShow(false)}>
      <Modal show={show}>
        <Alert
          show={show}
          variant="primary"
          onClose={() => setShow(false)}
          style={{
            position: "absolute",
          }}
          dismissible
        >
          Success! You added an item to your basket. Enjoy your new
          DiscoClothing®!
        </Alert>
      </Modal>
    </div>
  )
}
