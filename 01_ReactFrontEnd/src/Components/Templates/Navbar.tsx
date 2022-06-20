import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { useAtom } from "jotai"
import { showModalAtom } from "../store"
import { Account } from "../Organisms/AccountModal"
import { Login } from "../Organisms/LoginModal"
import { Register } from "../Organisms/RegisterModal"
import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" //used for icons in navbar
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faRightToBracket,
  faShoppingBasket,
  faUser,
} from "@fortawesome/free-solid-svg-icons"

library.add(faRightToBracket, faShoppingBasket, faUser)

export function NavigationBar() {
  const [, setModal] = useAtom(showModalAtom)
  const [isLogin, setLogin] = useState("")

  function getLogin() {
    setLogin(localStorage.getItem("isLoggedIn")!)
  }

  return (
    <div onLoad={getLogin}>
      <Navbar
        className="py-4 px-4"
        bg="primary"
        fixed="top"
        variant="dark"
        expand="lg"
      >
        <Container className="col-5">
          <Navbar.Brand href="/">
            <img
              src="../assets/img/logo/logo-discoclothing--white.svg"
              height="30"
              className=""
              alt="DiscoClothing® Logo"
            />
          </Navbar.Brand>
        </Container>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
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
            <Nav>
              {isLogin == "true" ? (
                <Nav.Link eventKey="button" onClick={() => setModal(true)}>
                  <FontAwesomeIcon icon="user" /> Account
                </Nav.Link>
              ) : (
                <Nav.Link eventKey="button" onClick={() => setModal(true)}>
                  <FontAwesomeIcon icon="right-to-bracket" /> Login
                </Nav.Link>
              )}
              <Nav.Link eventKey="Basket" href="/basket">
                <FontAwesomeIcon icon="basket-shopping" /> Basket
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isLogin == "true" ? <Account /> : <Login />}
      <Register />
    </div>
  )
}

export default Navbar
