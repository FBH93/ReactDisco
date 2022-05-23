/* import { useState, useEffect } from 'react'

export default function usersCall(userID: number) {
  const [user, getUser] = useState([])
  const API = getUserFromAPI(email)
  const fetchUser = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        console.log(res) //This prints twice, for some reason??
        getUser(res)
      })
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return user
}

//get products from API
function getUserFromAPI(userID: number) {
  return 'http://localhost:3000/customer/' + userID
}
 */

export {}
