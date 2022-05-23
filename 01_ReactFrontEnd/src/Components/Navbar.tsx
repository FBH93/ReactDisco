import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Modal,
  ModalBody,
  ModalTitle,
  ModalHeader,
  Button,
  ModalFooter,
} from 'react-bootstrap'
import { LoginForm } from './Login'
import { RegisterForm } from './Register'

export function NavigationBar() {
  const [showModal, setShowModal] = useState(false)

  const [showSignUp, setShowSignup] = useState(false)

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

  function closeAfterLogin() {
    setShowModal(false)
    localStorage.setItem('isLoggedIn', 'false')
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="../assets/img/logo/logo-discoclothing--white.svg"
              height="30"
              className="d-inline-block align-top"
              alt="DiscoClothing® Logo"
            />
          </Navbar.Brand>
        </Container>
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link eventKey="button" href="#button">
                Some Button
              </Nav.Link>
              <Nav.Link href="/products">All Products</Nav.Link>
              <NavDropdown title="Styles" id="basic-nav-dropdown">
                <NavDropdown.Item href="/products/70s">70s</NavDropdown.Item>
                <NavDropdown.Item href="/products/80s">80s</NavDropdown.Item>
                <NavDropdown.Item href="/products/sportswear">
                  Sportswear
                </NavDropdown.Item>
                <NavDropdown.Item href="/products/space">
                  Space
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="SomeLink" href="#SomeLink">
                  Some separate link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {localStorage.getItem('isLoggedIn') === 'true' ? (
                <Nav.Link eventKey="button" onClick={() => openModal()}>
                  {' '}
                  Hello {localStorage.getItem('firstname')}!{' '}
                </Nav.Link>
              ) : (
                <Nav.Link eventKey="button" onClick={() => openModal()}>
                  Login
                </Nav.Link>
              )}
              <Nav.Link eventKey="Basket" href="#basket">
                basket
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
                  <Button onClick={() => closeAfterLogin()}> Logout </Button>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbar
