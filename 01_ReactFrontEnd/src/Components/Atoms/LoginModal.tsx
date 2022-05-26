import { Form, Button, Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Alert } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAtom } from "jotai"
import { getUserData } from "../../Services/UserCall"
import { loginAtom, showModalAtom, signUpAtom, userAtom } from '../store'
import { localStorageCart, exportFromLocal, BasketProduct } from '../Basket'

export interface UserInterface {
  firstName: string
  lastName: string
  address: string
  email: string
  password: string
  customerID: string
}

export const Login = () => {

  const [inputEmail, setEmail] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [isLogin, setLogin] = useAtom(loginAtom);
  const [modal, setModal] = useAtom(showModalAtom);
  const [signUp, setSignUp] = useAtom(signUpAtom);
  const [currentUser, setUser] = useAtom(userAtom);
  const [value] = useAtom(userAtom);
  const [showAlert, setShow] = useState(false);

  const login = async () => {
    let data = await getUserData(inputEmail)
    console.log(data)
    const password = data.password
    if (password !== inputPassword) {
      setShow(true)
    } 
    else {
      setLogin(true)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("customerID", data.customerId)
      }
  }

  useEffect(() => {
    const updateUser = async () => {
      const currentUser = await getUserData(inputEmail)
      setUser(currentUser)
    }
    updateUser()
  }, [inputEmail])


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  function toggleToSignUp() {
    setModal(false);
    setSignUp(true);
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
        show={modal}>
        <ModalHeader>
          <ModalTitle>DiscoClothing® Members</ModalTitle>
          <Button
            variant="secondary"
            onClick={() => setModal(false)}
            data-bs-dismiss="modal"
            aria-label="Close">
            Close
          </Button>
        </ModalHeader>
        <ModalBody>
        <Alert show={showAlert} variant="danger" onClose={() => setShow(false)} dismissible> Wrong Password! Please try again </Alert>
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
            <div className="modal-footer">
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
