import { useEffect, useState } from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Nav } from "react-bootstrap"
import { LoginForm } from "../Login"
import { RegisterForm } from "../Register"
import { useNavigate } from "react-router-dom"

export interface customer {
    customerId: string
    firstName: string
    lastName: string
    password: string
    email: string
    address: string
  }

export function ProfileButton() {
    const [showModal, setShowModal] = useState(false)
    const [showSignUp, setShowSignup] = useState(false)
    const navigate = useNavigate()    
    
    function closeModal() {
      setShowModal(false)
    }
  
    function openModal() {
      setShowModal(true)
    }
  
    function handleSignup() {
      setShowModal(false)
      setShowSignup(true)
    }
  
    function closeSignup() {
      setShowSignup(false)
    }
  
    function closeAfterLogOut() {
      setShowModal(false)
      localStorage.setItem('isLoggedIn', 'false')
      localStorage.removeItem('emailLoggedIn');
      localStorage.removeItem('firstName');
      navigate(0)
    }    

    return (
        <>
        <Nav>
        {localStorage.getItem('isLoggedIn') === 'true' ? (
          <Nav.Link eventKey="button" onClick={() => openModal()}>
              <p>{localStorage.getItem('firstName')}</p>
          </Nav.Link>
        ) : (
          <Nav.Link eventKey="button" onClick={() => openModal()}>
            Login
          </Nav.Link>
        )}
        <Nav.Link eventKey="Basket" href="/basket">
          Basket
        </Nav.Link>
      </Nav>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        role="dialog"
        tabindex="-1"
        id="loginModal"
        show={showModal}
      >
        <ModalHeader>
          <ModalTitle>DiscoClothing® Members</ModalTitle>
          <Button
            variant="secondary"
            onClick={() => closeModal()}
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            Close
          </Button>
        </ModalHeader>
        <ModalBody>
          {localStorage.getItem('isLoggedIn') === 'true' ? (
            //Add user card here
            <>
            
            <Button onClick={() => closeAfterLogOut()}> Logout </Button>
            </>
          ) : (
            <LoginForm />
          )}
        </ModalBody>
        <ModalFooter>
          {localStorage.getItem('isLoggedIn') === 'true' ? null : (
            <div className="modal-footer">
              <span>No account yet?</span>
              <button
                className="btn btn-secondary discoButton"
                data-bss-hover-animate="pulse"
                type="submit"
                onClick={() => handleSignup()}
              >
                Register new account
              </button>
            </div>
          )}
        </ModalFooter>
      </Modal>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        role="dialog"
        tabindex="-1"
        id="signupModal"
        show={showSignUp}
      >
        <ModalHeader>
          <ModalTitle> DiscoClothing® Members</ModalTitle>
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
          <RegisterForm />
        </ModalBody>
      </Modal>
      </>
    )

  }
  
  export default ProfileButton
  