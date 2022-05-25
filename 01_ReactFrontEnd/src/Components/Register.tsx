import React from 'react';
import { useState } from "react";
import {Form} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from 'axios';

export const RegisterForm = () => {

const navigate = useNavigate();

const [inputEmail, setEmail] = useState("");
const [inputPassword, setPassword] = useState("");
const [inputFirstName, setFirstName] = useState("");
const [inputName, setName] = useState("");
const [inputAddress, setAddress] = useState("");
const [inputConfirmPas, setConfirmPas] = useState("");

const errors = {
        uname: "incorrect email",
        pass: "incorrect password",
        confirmPass: "password do not match"
      };

const register = () => {
    localStorage.setItem("psw", inputPassword);
    localStorage.setItem("email", inputEmail);
    localStorage.setItem("firstname", inputFirstName);
    localStorage.setItem("name", inputName);
    localStorage.setItem("address", inputAddress);
    localStorage.setItem("isLoggedIn", "true");
  }

let handleSubmit = async (e) => {
        e.preventDefault();
        let customerID = Math.floor((Math.random() * 100000) + 1);
        const data = {
          customerID: customerID,
          fname: inputFirstName,
          lname: inputName,
          email: inputEmail,
          pword: inputPassword,
          addr: inputAddress 
        };
        //POST call to API to create user from input data
         axios
         .post("http://localhost:3000/customer/", data)
         .then(res => console.log(res))
         .catch(err => console.log(err));
         localStorage.setItem("isLoggedIn", "true");
         localStorage.setItem("customerID", customerID.toString());
        //POST create basket for new user http://localhost:3000/basket/{ID}
};

return (
    <Form method="post" onSubmit={register}>
                <div className="row">
                    <div className="col-6"><label className="form-label">First Name*</label><input className="form-control" type="text" id="firstname"  onChange={(event) => setFirstName(event.target.value)} required/></div>
                    <div className="col-6"><label className="form-label">Last Name*</label><input className="form-control" type="text" id="name" onChange={(event) => setName(event.target.value)} required/></div>
                </div>
                <div className="row disco-form-row">
                    <div className="col-6"><label className="form-label">Address*</label><input className="form-control" type="text" id="address" onChange={(event) => setAddress(event.target.value)} required/></div>
                    <div className="col-12"><label className="form-label">E-Mail*</label><input className="form-control" type="email" id="email" onChange={(event) => setEmail(event.target.value)} required/></div>
                </div>
                <div className="row disco-form-row">
                    <div className="col-12"><label className="form-label">Password*</label><input className="form-control" type="password" id="discoPassword" onChange={(event) => setPassword(event.target.value)} required/></div>
                </div>
                <div className="row disco-form-row">
                    <div className="col-12"><label className="form-label">Repeat Password*</label><input className="form-control" type="password" id="discoPasswordConfirm" required onChange={(event) => setConfirmPas(event.target.value)}/></div>
                </div>
                <div className="row disco-form-row" style={{paddingTop: "16px"}}>
                    <div className="col">
                        <div><span>* required fields</span></div>
                    </div>
                </div>
                <div className="row disco-form-row" style={{paddingTop: "16px"}}>
                    <div className="col"><button className="btn btn-primary discoButton" data-bss-hover-animate="pulse" id="discoRegister" type="submit" onClick={handleSubmit}>Register</button></div>
                </div>
        </Form>
)}