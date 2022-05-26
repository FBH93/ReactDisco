import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { useAtom } from "jotai"
import { loginAtom, showModalAtom } from "../store"
import { Account } from "./AccountModal"
import { Login } from "./LoginModal"
import { Register } from "./RegisterModal"

export function NavigationBar() {
  const [, setModal] = useAtom(showModalAtom)
  const login = localStorage.getItem("isLoggedIn")

  return (
    <div>
      <Navbar
        className="py-4 px-4"
        bg="primary"
        fixed="top"
        variant="dark"
        expand="lg"
      >
        <Container>
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
              {login == "true" ? (
                <Nav.Link eventKey="button" onClick={() => setModal(true)}>
                  <p> Account </p>
                </Nav.Link>
              ) : (
                <Nav.Link eventKey="button" onClick={() => setModal(true)}>
                  Login
                </Nav.Link>
              )}
              <Nav.Link eventKey="Basket" href="/basket">
                Basket
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {login == "true" ? <Account /> : <Login />}
      <Register />
    </div>
  )
}

export default Navbar
