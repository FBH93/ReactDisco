import { Form, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const LoginForm = () => {

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [inputEmail, setEmail] = useState("");
    const [inputPassword, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLogin, setLogin] = useState(false);


    const errors = {
            uname: "incorrect email",
            pass: "incorrect password"
        };
        
const login = () => {
    const password = localStorage.getItem("psw")
    const email = localStorage.getItem("email")

    if (password !== inputPassword) {
    setErrorMessages({ name: "pass", message: errors.pass });
    } 
    if(email !== inputEmail){
    setErrorMessages({ name: "email", message: errors.uname });
    }
    else {
    setIsSubmitted(true);
    setLogin(true);
    localStorage.setItem("isLoggedIn", "true")
    navigate(-1);
    }
 };

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();}
    
return(
<div>
<Form method="post" onSubmit={handleSubmit}>
                      <div className="row">
                          <div className="col"><label className="form-label">E-Mail</label>
                          <input className="form-control" autoFocus type="email" id="loginEmail" onChange={(event) => setEmail(event.target.value)} required/></div>
                      </div>
                      <div className="row disco-form-row">
                          <div className="col"><label className="form-label">Password</label><input className="form-control" type="password" id="loginPass" name="password" onChange={(event) => setPassword(event.target.value)} required/></div>
                      </div>
                      <div className="row disco-form-row">
                          <div className="col"><button className="btn btn-primary discoButton" data-bss-hover-animate="pulse" type="button" onClick={login}>Login</button></div>
                      </div>
</Form>
</div>
)}

