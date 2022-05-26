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
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { getUserData } from "../../Services/UserCall"
import { emailAlertAtom, showModalAtom, signUpAtom, userAtom } from "../store"
import { localStorageCart, exportFromLocal, BasketProduct } from "../Basket"

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
  const [emailAlert] = useAtom(emailAlertAtom)

  const login = async () => {
    let data = await getUserData(inputEmail)
    const password = data.password
    if (password !== inputPassword) {
      setShow(true)
    } else {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("customerID", data.customerId)
      localStorage.setItem("firstName", data.firstName)
      setModal(false)
      exportFromLocal(data.customerId, await localStorageCart())
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

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
        tabindex="-1"
        id="loginModal"
        show={modal}
      >
        <ModalHeader>
          <ModalTitle>DiscoClothing® Members</ModalTitle>
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
            Wrong Password! Please try again{" "}
          </Alert>
          <Alert
            show={emailAlert}
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {" "}
            Wrong Password! Please try again{" "}
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
