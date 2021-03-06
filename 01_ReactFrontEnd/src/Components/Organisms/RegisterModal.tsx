import { useState } from "react"
import {
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalHeader,
  Button,
} from "react-bootstrap"

import { showModalAtom, signUpAtom } from "../store"
import { useAtom } from "jotai"

import { createUser } from "../../Services/UserCall"

export const Register = () => {
  const [inputEmail, setEmail] = useState("")
  const [inputPassword, setPassword] = useState("")
  const [inputFirstName, setFirstName] = useState("")
  const [inputName, setName] = useState("")
  const [inputAddress, setAddress] = useState("")
  const [, setConfirmPas] = useState("")
  const [, setModal] = useAtom(showModalAtom)
  const [signUp, setSignUp] = useAtom(signUpAtom)

  let handleSubmit = async (e) => {
    e.preventDefault()
    createUser(
      inputFirstName,
      inputName,
      inputEmail,
      inputPassword,
      inputAddress
    )
    handleSignup()
    window.location.reload()
  }

  function handleSignup() {
    setModal(false)
    setSignUp(false)
  }

  function closeSignup() {
    setSignUp(false)
    setModal(false)
  }

  function toggleToLogin() {
    setSignUp(false)
    setModal(true)
  }

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      role="dialog"
      tabIndex="-1"
      id="signupModal"
      show={signUp}
    >
      <ModalHeader>
        <ModalTitle> Become a DiscoClothing┬« member today!</ModalTitle>
        <Button
          variant="secondary"
          onClick={() => closeSignup()}
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          Close
        </Button>
      </ModalHeader>
      <ModalBody>
        <Form method="post" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <label className="form-label">First Name*</label>
              <input
                className="form-control"
                type="text"
                id="firstname"
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <label className="form-label">Last Name*</label>
              <input
                className="form-control"
                type="text"
                id="name"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="row disco-form-row">
            <div className="col-6">
              <label className="form-label">Address*</label>
              <input
                className="form-control"
                type="text"
                id="address"
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </div>
            <div className="row disco-form-row">
              <div className="col-12">
                <label className="form-label" typeof="email">
                  E-Mail*
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row disco-form-row">
            <div className="col-12">
              <label className="form-label">Password*</label>
              <input
                className="form-control"
                type="password"
                id="discoPassword"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="row disco-form-row">
            <div className="col-12">
              <label className="form-label">Repeat Password*</label>
              <input
                className="form-control"
                type="password"
                id="discoPasswordConfirm"
                required
                onChange={(event) => setConfirmPas(event.target.value)}
              />
            </div>
          </div>
          <div className="row disco-form-row" style={{ paddingTop: "16px" }}>
            <div className="col">
              <div>
                <span>* required fields</span>
              </div>
            </div>
          </div>
          <div className="row disco-form-row" style={{ paddingTop: "16px" }}>
            <div className="col">
              <button
                className="btn btn-primary discoButton"
                data-bss-hover-animate="pulse"
                id="discoRegister"
                type="submit"
              >
                Register
              </button>
            </div>
          </div>
        </Form>
      </ModalBody>
      <ModalFooter>
        <div className="modal-footer">
          <span>Already have an account?</span>
          <Button
            className="btn btn-secondary discoButton"
            data-bss-hover-animate="pulse"
            type="submit"
            onClick={() => toggleToLogin()}
          >
            Login
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
