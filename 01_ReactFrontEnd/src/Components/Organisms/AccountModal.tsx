import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  Row,
  Col,
} from "react-bootstrap"
import { useAtom } from "jotai"
import { loginAtom, showModalAtom } from "../store"

export const Account = () => {
  const [, setLogin] = useAtom(loginAtom)
  const [modal, setModal] = useAtom(showModalAtom)
  const firstName = localStorage.getItem("firstName")
  const lastName = localStorage.getItem("lastName")
  const email = localStorage.getItem("email")
  const address = localStorage.getItem("address")

  //handels logout of users 
  function handleLogOut() {
    setModal(false)
    localStorage.setItem("isLoggedIn", "false")
    localStorage.removeItem("customerID")
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
    localStorage.removeItem("email")
    localStorage.removeItem("address")
    setLogin(false)
    window.location.reload()
  }

  //creates the user modal that displays user information 
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      role="dialog"
      tabindex="-1"
      id="accountModal"
      show={modal}
    >
      <ModalHeader>
        <ModalTitle>Hey {firstName}! Welcome back to DiscoClothing┬«</ModalTitle>
        <Button
          variant="secondary"
          onClick={() => setModal(false)}
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          Close
        </Button>
      </ModalHeader>
      <ModalBody>
        <div>
          <Row>
            <Col xs={6} md={4}>
              <p>
                <b>First Name:</b>
              </p>{" "}
            </Col>
            <Col xs={12} md={8}>
              <p>{firstName}</p>{" "}
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <p>
                <b>Last Name:</b>
              </p>{" "}
            </Col>
            <Col xs={12} md={8}>
              <p> {lastName} </p>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <p>
                <b>Address: </b>
              </p>
            </Col>
            <Col xs={12} md={8}>
              <p>{address}</p>{" "}
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <p>
                <b>E-mail:</b>
              </p>
            </Col>
            <Col xs={12} md={8}>
              <p> {email}</p>
            </Col>
          </Row>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="primary"
          onClick={handleLogOut}
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          Logout
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default Account
