import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useAtom } from 'jotai'
import { loginAtom, showModalAtom } from './store'
import { Account } from './Atoms/AccountModal'
import { Login } from './Atoms/LoginModal'
import { Register } from './Atoms/RegisterModal'

export function NavigationBar() {

  const [login, setLogin] = useAtom(loginAtom);
  const [modal, setModal] = useAtom(showModalAtom);

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
            <Nav>
              {login ? (
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
      {login ? <Account /> :
        <Login />}
      <Register />
    </div>
  )
}

export default Navbar
