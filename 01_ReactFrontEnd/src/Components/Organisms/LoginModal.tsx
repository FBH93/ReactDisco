import {
  Form,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  Alert,
} from "react-bootstrap"
import { useState } from "react"
import { useAtom } from "jotai"
import { getUserData } from "../../Services/UserCall"
import { showModalAtom, signUpAtom } from "../store"
import { localStorageCart, exportFromLocal } from "../Templates/Basket"

export interface UserInterface {
  firstName: string
  lastName: string
  address: string
  email: string
  password: string
  customerID: string
}

export const Login = () => {
  const [inputEmail, setEmail] = useState("")
  const [inputPassword, setPassword] = useState("")
  const [modal, setModal] = useAtom(showModalAtom)
  const [, setSignUp] = useAtom(signUpAtom)
  const [showAlert, setShow] = useState(false)

  //logs in user given they are registered 
  const login = async () => {
    let data = await getUserData(inputEmail)
    const password = data.password
    if (password !== inputPassword) {
      setShow(true)
    } else {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("customerID", data.customerID)
      localStorage.setItem("firstName", data.firstName)
      localStorage.setItem("lastName", data.lastName)
      localStorage.setItem("email", data.email)
      localStorage.setItem("address", data.address)
      setModal(false)
      await exportFromLocal(data.customerID, await localStorageCart())
      window.location.reload()
    }
  }
  //prevents default submit behavior of login form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  //toggle modal content between login and register 
  function toggleToSignUp() {
    setModal(false)
    setSignUp(true)
  }

  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        role="dialog"
        tabIndex="-1"
        id="loginModal"
        show={modal}
      >
        <ModalHeader>
          <ModalTitle>DiscoClothing┬« Members</ModalTitle>
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
          <Alert
            show={showAlert}
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {" "}
            Wrong Login Details! Please try again{" "}
          </Alert>
          <Form method="post" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <label className="form-label">E-Mail</label>
                <input
                  className="form-control"
                  autoFocus
                  type="email"
                  id="loginEmail"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row disco-form-row">
              <div className="col">
                <label className="form-label">Password</label>
                <input
                  className="form-control"
                  type="password"
                  id="loginPass"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row disco-form-row" style={{ paddingTop: "16px" }}>
              <div className="col">
                <button
                  className="btn btn-primary discoButton"
                  data-bss-hover-animate="pulse"
                  type="button"
                  onClick={login}
                >
                  Login
                </button>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div className="modal-footer ">
            <span>No account yet?</span>
            <Button
              className="btn btn-secondary discoButton"
              data-bss-hover-animate="pulse"
              type="submit"
              onClick={() => toggleToSignUp()}
            >
              Register new account
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
}
