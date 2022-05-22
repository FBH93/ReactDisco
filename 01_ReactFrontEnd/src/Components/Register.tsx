import React from 'react';
import { useState } from "react";
import {Form} from 'react-bootstrap';

export const RegisterForm = () => {

const [show, setShow] = useState(false);
const [errorMessages, setErrorMessages] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);
const [inputEmail, setEmail] = useState("");
const [inputPassword, setPassword] = useState("");
const [inputFirstName, setFirstName] = useState("");
const [inputName, setName] = useState("");
const [inputCountry, setCountry] = useState("");
const [inputZip, setZip] = useState("");
const [inputStreet, setStreet] = useState("");
const [inputCity, setCity] = useState("");
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
    localStorage.setItem("country", inputCountry);
    localStorage.setItem("zip", inputZip);
    localStorage.setItem("street", inputStreet);
    localStorage.setItem("city", inputCity);
    localStorage.setItem("isLogin", "1");

  }

  const checkMatch = () => {
    if (inputConfirmPas !== inputPassword) {
        setErrorMessages({ name: "confirm-Pass", message: errors.confirmPass });
    }
  }

return (
    <Form method="post" onSubmit={register}>
                <div className="row">
                    <div className="col-6"><label className="form-label">First Name*</label><input className="form-control" type="text" id="firstname"  onChange={(event) => setFirstName(event.target.value)} required/></div>
                    <div className="col-6"><label className="form-label">Last Name*</label><input className="form-control" type="text" id="name" onChange={(event) => setName(event.target.value)} required/></div>
                </div>
                <div className="row disco-form-row">
                    <div className="col-6"><label className="form-label">Street*</label><input className="form-control" type="text" id="street" onChange={(event) => setStreet(event.target.value)} required/></div>
                    <div className="col-6"><label className="form-label">City*</label><input className="form-control" type="text" id="city" onChange={(event) => setCity(event.target.value)} required/></div>
                </div>
                <div className="row disco-form-row">
                    <div className="col-6"><label className="form-label">Country*</label><input className="form-control" type="text" id="country" onChange={(event) => setCountry(event.target.value)} required/></div>
                    <div className="col-6"><label className="form-label">ZIP*</label><input className="form-control" type="text" id="zip" pattern="^[0-9]{4,5}$" onChange={(event) => setZip(event.target.value)} required/></div>
                </div>
                <div className="row disco-form-row">
                    <div className="col-12"><label className="form-label">E-Mail*</label><input className="form-control" type="email" id="email" onChange={(event) => setEmail(event.target.value)} required/></div>
                </div>
                <div className="row disco-form-row">
                    <div className="col-12"><label className="form-label">Password*</label><input className="form-control" type="password" id="discoPassword" onChange={(event) => setPassword(event.target.value)} required/></div>
                </div>
                <div className="row disco-form-row">
                    <div className="col-12"><label className="form-label">Repeat Password*</label><input className="form-control" type="password" id="discoPasswordConfirm" required onChange={(event) => setConfirmPas(event.target.value)} onInput={checkMatch}/></div>
                </div>
                <div className="row disco-form-row" style={{paddingTop: "16px"}}>
                    <div className="col">
                        <div><span>* required fields</span></div>
                    </div>
                </div>
                <div className="row disco-form-row" style={{paddingTop: "16px"}}>
                    <div className="col"><button className="btn btn-primary discoButton" data-bss-hover-animate="pulse" id="discoRegister" type="submit">Register</button></div>
                </div>
        </Form>
)}