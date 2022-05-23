import { Component } from 'react'

export class Greetings extends Component {
  render() {
    return (
        <><h1> Hello {localStorage.getItem('firstname')} your ID is {localStorage.getItem('customerID')}</h1>
        <h1> are you logged in?{localStorage.getItem('isLoggedIn')}</h1></> 
    )
  }
}