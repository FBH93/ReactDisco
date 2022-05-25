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
import ProfileButton from './Atoms/ProfileButton'

export function NavigationBar() {

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
              </NavDropdown>
              <NavDropdown title="Types" id="basic-nav-dropdown">
                <NavDropdown.Item href="/products/shirts">
                  Shirts
                </NavDropdown.Item>
                <NavDropdown.Item href="/products/pants">
                  Pants
                </NavDropdown.Item>
                <NavDropdown.Item href="/products/jackets">
                  Jackets
                </NavDropdown.Item>
                <NavDropdown.Item href="/products/accessories">
                  Accessories
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Prices" id="basic-nav-dropdown">
                <NavDropdown.Item href="/products/discount">
                  Discount
                </NavDropdown.Item>
                <NavDropdown.Item href="/products/premium">
                  Premium
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <ProfileButton/>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbar
