
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React, {useCallback, useRef} from 'react'

export const NavigationBar = () => (
<Navbar bg="dark" variant="dark" expand="lg">
    <Container>
        <Navbar.Brand href="#home">
        <img
            src="assets/img/logo/logo-discoclothing--white.svg"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
        />
    </Navbar.Brand>
  </Container>
    <Container>
        <Navbar.Brand href="#home">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Some Button</Nav.Link>
                    <Nav.Link href="#link">All Products</Nav.Link>
                    <NavDropdown title="Filters" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Style</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Type</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Price</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Some separate link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="#profile">Profile</Nav.Link>
                    <Nav.Link eventKey={2} href="#basket">basket</Nav.Link>
                </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
)
export default Navbar