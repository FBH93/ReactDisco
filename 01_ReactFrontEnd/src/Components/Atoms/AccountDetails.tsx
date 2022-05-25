import { Button, Form, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter } from 'react-bootstrap'
import { useAtom } from 'jotai'
import { loginAtom, showModalAtom } from '../store'


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
          <Form method="post">
                <div className="row">
                    <div className="col-6"><label className="form-label">First Name</label>   marie <label/></div>
                    <div className="col-6"><label className="form-label">Last Name</label>    har <label/></div>
                </div>
                <div className="row disco-form-row">
                    <div className="col-6"><label className="form-label">Address</label>Address<label/></div>
                    <div className="col-12"><label className="form-label">E-Mail</label>Email<label/></div>
                </div>
            </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="secondary"
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
