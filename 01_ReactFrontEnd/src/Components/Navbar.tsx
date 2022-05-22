
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React, {Component, useCallback, useRef, useState} from 'react'
import ProductGrid from './ProductGrid'
import { render } from 'react-dom'

export class NavigationBar extends Component {
    filter1: string;
    filter2: string;
    profile: string;
    constructor(props){
        super(props);
        this.filter1 = ''
        this.filter2 = 'None'
        this.profile = 'Profile'
    }

    setFilter(filter1: string, filter2: string){
        this.filter1 = filter1;
        this.filter2 = filter2;
    }

    setProfile(profileName: string){
        this.profile = profileName + 1;
    }

/*
    const [filter,setFilter]=useState({
        filter: '',
        type: 'None'
    });

    const [profile, setProfile]=useState({
        profileName: 'Profile'
    });

    const handleSetFilter=({e}) => {
        setFilter(prevFilter=> ({
            ...prevFilter,
            filter: e.filter,
            type: e.type
        }))
    }
*/
    handleSelect=(e)=>{
      console.log(e);
      console.log('filter1 is ' + this.filter1 + ', filter2 is '+ this.filter2 + ',  and profile is ' + this.profile)
    }

    render() {
        const filter = this.filter1;
        const filter2 = this.filter2;
        const profile = this.profile;
        return (
        <div>
        <Navbar bg="dark" variant="dark" expand="lg" onSelect={this.handleSelect}>
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
                            <Nav.Link onClick={(event)=> this.setFilter('', 'None')} href="#products">All Products</Nav.Link>
                            <NavDropdown title="Styles" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={(event)=> this.setFilter('style=70s', 'None')} href="#70s">70s</NavDropdown.Item>
                                <NavDropdown.Item onClick={(event)=> this.setFilter('style=80s', 'None')} href="#80s">80s</NavDropdown.Item>
                                <NavDropdown.Item onClick={(event)=> this.setFilter('style=sportswear', 'None')} href="#Price">sportswear</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="SomeLink" href="#SomeLink">Some separate link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link eventKey="Profile" onClick={(event)=> this.setProfile(profile)} href="#profile">{profile}</Nav.Link>
                            <Nav.Link eventKey="Basket" href="#basket">basket</Nav.Link>
                        </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <ProductGrid filter1={'style=70s'} filter2={'None'}/>
        </div>
        );
    }
}
export default Navbar