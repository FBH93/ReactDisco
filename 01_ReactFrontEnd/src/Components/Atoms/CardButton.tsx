import { Button } from "react-bootstrap"
import { putProductToBasket } from "../../Services/UserCall"
import { useAtom } from "jotai"
import { cardAlertAtom } from "../store"
import { CardAlert } from "./CardAlert"

type CardButtonProps = {
  pID: number
  size: string
}

export const CardButton: React.FC<CardButtonProps> = ({ pID, size }) => {
  const [, setAlert] = useAtom(cardAlertAtom)
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
            setAlert(true)
          }}
        >
          Add to cart
        </Button>
        <CardAlert />
      </div>
    </>
  )
}
