import { Form } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginAtom } from "./store"
import { useAtom } from "jotai"
import { getUserData } from "../Services/UserCall"

export const LoginForm = () => {
  const [errorMessages, setErrorMessages] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [inputEmail, setEmail] = useState("")
  const [inputPassword, setPassword] = useState("")
  const navigate = useNavigate()
  const [isLogin, setLogin] = useAtom(loginAtom)

  const errors = {
    uname: "incorrect email",
    pass: "incorrect password",
  }

  const login = async () => {
    //Get user details from API, then check if login is valid for that user.
    let data = await getUserData(inputEmail)
    const password = data.password
    const email = data.email
    console.log(password)
    console.log(email)
    if (password !== inputPassword) {
      setErrorMessages({ name: "pass", message: errors.pass })
      alert("Wrong Password")
    } 
    else {
      setIsSubmitted(true)
      setLogin(true)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("emailLoggedIn", email)
      localStorage.setItem('firstName', data.firstName)
      localStorage.setItem('lastName', data.lastName)
      localStorage.setItem('address', data.address)
      localStorage.setItem('CID', data.customerId)
      navigate(0)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div>
      <Form method="post" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label className="form-label">E-Mail</label>
            <input
              className="form-control"
              autoFocus
              type="email"
              id="loginEmail"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="row disco-form-row">
          <div className="col">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              id="loginPass"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="row disco-form-row" style={{ paddingTop: "16px" }}>
          <div className="col">
            <button
              className="btn btn-primary discoButton"
              data-bss-hover-animate="pulse"
              type="button"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </Form>
    </div>
  )
}
