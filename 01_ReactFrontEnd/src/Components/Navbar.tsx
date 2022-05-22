
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React, {Component, useCallback, useRef, useState} from 'react'
import { Modal, ModalBody, ModalTitle, ModalHeader, Button, ModalFooter } from 'react-bootstrap'
import { LoginForm } from './Login'
import { RegisterForm } from './Register'

export class NavigationBar extends React.Component <{}, {showModal: boolean, showSignUp: boolean, filter1: string, filter2: string}> {
    profile: string;
    
    constructor(props){
        super(props);
        this.profile = 'Profile'
        this.state = {
            showModal: false,
            showSignUp: false,
            filter1: 'None',
            filter2: 'None'
          }
    }

    handleFilter(filterA, filterB){
        this.setState(
            {filter1 : filterA}
        );
        this.setState(
            {filter2 : filterB}
        );
    }

    closeModal() {
        this.setState(
          {showModal : false}
        )
      }
    
    openModal() {
        this.setState(
            {showModal : true}
          )
    }

    handleSignup() {
    this.setState(
        {showModal : false,
        showSignUp: true}
      )
    }

    closeSignup() {
        this.setState(
          {showSignUp : false}
        )
      }
    
    closeAfterLogin() {
        this.setState({showModal: false});
        console.log(this.state.showModal);
      }

    /*
    setFilter(filter1: string, filter2: string){
        this.filter1 = filter1;
        this.filter2 = filter2;
    }
    */

    setProfile(profileName: string){
        this.profile = profileName + 1;
    }

    handleSelect=(e)=>{
      console.log(e);
      var debugFilterMsg = 'filter1 is ' + this.state.filter1 + ', filter2 is '+ this.state.filter2 + ',  and profile is ' + this.profile
      console.log(debugFilterMsg)
    }

    render() {
        const profile = this.profile;
        var filter1 = this.state.filter1
        var filter2 = this.state.filter2
        return (
        <div>
        <Navbar bg="dark" variant="dark" expand="lg" onSelect={this.handleSelect}>
            <Container>
                <Navbar.Brand href="/" >
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
                            <Nav.Link eventKey="button" href="#button">Some Button</Nav.Link>
                            <Nav.Link onClick={(event)=> this.handleFilter('None', 'None')} href="#products">All Products</Nav.Link>
                            <NavDropdown title="Styles" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={(event)=> this.handleFilter('style=70s', 'None')} href="/products/70s">70s</NavDropdown.Item>
                                <NavDropdown.Item onClick={(event)=> this.handleFilter('style=80s', 'None')} href="/products/80s">80s</NavDropdown.Item>
                                <NavDropdown.Item onClick={(event)=> this.handleFilter('style=sportswear', 'None')} href="/products/sportswear">Sportswear</NavDropdown.Item>
                                <NavDropdown.Item onClick={(event)=> this.handleFilter('style=space', 'None')} href="/products/space">Space</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="SomeLink" href="#SomeLink">Some separate link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link eventKey="button" onClick={() => this.openModal()}>Login</Nav.Link>
                            <Nav.Link eventKey="Basket" href="#basket">basket</Nav.Link>
                        </Nav>
                        <Modal
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            role="dialog" tabindex="-1" id="loginModal"
                            show = {this.state.showModal}>
                                <ModalHeader>
                                    <ModalTitle>DiscoClothing® Members</ModalTitle>
                                        <Button variant="secondary" onClick={() => this.closeModal()} data-bs-dismiss="modal" aria-label="Close">Close</Button>
                                </ModalHeader>
                                <ModalBody>
                                    <LoginForm />
                                </ModalBody>
                                <ModalFooter>
                                <div className="modal-footer"><span>No account yet?</span><button className="btn btn-secondary discoButton" data-bss-hover-animate="pulse" type="submit" onClick={() => this.handleSignup()}>Register new account</button></div>
                                </ModalFooter>
                            </Modal> 
                            <Modal
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                role="dialog" tabindex="-1" id="signupModal"
                                show = {this.state.showSignUp}>
                                <ModalHeader>
                                    <ModalTitle> DiscoClothing® Members</ModalTitle>
                                        <Button variant="secondary" onClick={() => this.closeSignup()} data-bs-dismiss="modal" aria-label="Close">Close</Button>
                                </ModalHeader>
                                <ModalBody>
                                    <RegisterForm />
                                </ModalBody>
                            </Modal> 
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
        );
    }
}

export default Navbar
