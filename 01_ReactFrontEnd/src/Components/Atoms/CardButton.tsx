import { Button } from "react-bootstrap"
import { putProductToBasket } from "../../Services/UserCall"
import { useAtom } from "jotai"
import { cardAlertAtom } from "../store"
import { CardAlert } from "./CardAlert"

// creating custom type CardButtonProps with type properties productID of number and size of string
type CardButtonProps = {
  pID: number
  size: string
}

// in the same way as if we were declaring the type of this function to expect a number or string, here we are using type annotation to show that the type is CardButtonProps, which expects a productID and size.
export const CardButton: React.FC<CardButtonProps> = ({ pID, size }) => {
  const [, setAlert] = useAtom(cardAlertAtom) // used to alert a message to the user when a product is added to the cart. We use useAtom instead of useState as it then can be used anywhere in the code even if it is a child component on the same or lower level in the hierarchy. It doesn't need to be on the parent level before it can be used, as it is an atom (making it accessible from anywhere).
  const addItem = (pID: number, size: string) => {
    if (localStorage.getItem("customerID")) {
      // getting the customerID from localstorage.
      let cID = localStorage.getItem("customerID")
      if (cID) {
        // checking if a customerID exists - checking if the user is registered and logged in
        putProductToBasket(cID, pID, size) // if the user is logged in a PUT request from the UserCall.tsx is called which needs customerID, productID and selectde size.
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
            setAlert(true) // when the "add to cart" button is clicked it will trigger an event that uses productID and selected size (default S) to call the addItem function and sets the useAtom to true meaning that an alert will pop up letting the user know that the product has been added to the cart.
          }}
        >
          Add to cart
        </Button>
        <CardAlert />
      </div>
    </>
  )
}
