
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React, {Component, useCallback, useRef, useState} from 'react'

export function NavigationBar() {
    const [value,setValue]=useState('');
    const handleSelect=(e)=>{
      console.log(e);
      setValue(e)
    }
    return (
    <Navbar bg="dark" variant="dark" expand="lg" onSelect={handleSelect}>
        <Container>
            <Navbar.Brand href="#home" >
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
                        <Nav.Link eventKey="button" href="#button">Some Button</Nav.Link>
                        <Nav.Link eventKey="allProducts" href="#products">All Products</Nav.Link>
                        <NavDropdown title="Filters" id="basic-nav-dropdown">
                            <NavDropdown.Item eventKey="Styles" href="#style">Style</NavDropdown.Item>
                            <NavDropdown.Item eventKey="Types" href="#Type">Type</NavDropdown.Item>
                            <NavDropdown.Item eventKey="Prices" href="#Price">Price</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="SomeLink" href="#SomeLink">Some separate link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey="Profile" href="#profile">Profile</Nav.Link>
                        <Nav.Link eventKey={"Basket"} href="#basket">basket</Nav.Link>
                    </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}
export default Navbar