import { Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter, Row, Col } from 'react-bootstrap'
import { useAtom } from 'jotai'
import { loginAtom, showModalAtom } from '../store'
import { getUserData } from '../../Services/UserCall'


export const Account = () => {

  const[login, setLogin] = useAtom(loginAtom)
  const[modal, setModal] = useAtom(showModalAtom) 

  function handleLogOut() {
    setModal(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("CustomerID");
    setLogin(false);
    }

  return (
    <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        role="dialog"
        tabindex="-1"
        id="accountModal"
        show={modal}>
        <ModalHeader>
          <ModalTitle>Hey ! Welcome back to DiscoClothing®</ModalTitle>
          <Button
            variant="secondary"
            onClick={() => setModal(false)}
            data-bs-dismiss="modal"
            aria-label="Close">
            Close
          </Button>
        </ModalHeader>
        <ModalBody>
          <div>
                <Row >
                    <Col xs={6} md={4}><p><b>First Name:</b></p>   </Col>
                    <Col xs={12} md={8}><p>Marie</p> </Col>
                </Row>
                <Row >
                    <Col xs={6} md={4}><p><b>Last Name:</b></p>  </Col>
                    <Col xs={12} md={8}><p> Hardelauf </p></Col>
                </Row>
                <Row >
                    <Col xs={6} md={4}><p><b>Address: </b></p></Col>
                    <Col xs={12} md={8}><p>address</p> </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}><p><b>E-mail:</b></p></Col>
                    <Col xs={12} md={8}><p> email@email</p></Col>
                </Row>
            </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            onClick={handleLogOut}
            data-bs-dismiss="modal"
            aria-label="Close">
            Logout
          </Button>
        </ModalFooter>
      </Modal>
  )
}

export default Account
