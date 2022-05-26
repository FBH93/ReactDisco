import { Form, Button, Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAtom } from "jotai"
import { getUserData } from "../../Services/UserCall"
import { loginAtom, showModalAtom, signUpAtom, userAtom } from '../store'

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
  const [isLogin, setLogin] = useAtom(loginAtom)
  const[modal, setModal] = useAtom(showModalAtom)
  const [signUp, setSignUp] = useAtom(signUpAtom);
  const [currentUser, setUser] = useAtom(userAtom);


  const login = async () => {
    //Get user details from API, then check if login is valid for that user.
    let data = await getUserData(inputEmail)
    const password = data.password
    const email = data.email
    if (password !== inputPassword) {
      alert("Wrong Password")
    } 
    else {
      setLogin(true)
      localStorage.setItem("firstName", data.fName)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("customerID", data.customerId)
      const currentUser = await getUserData(inputEmail)
      setUser(currentUser)
      }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  function toggleToSignUp() {
    setModal(false);
    setSignUp(true);
  }

  return (
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
  )
}
