import axios from 'axios'


export function putProductToBasket(userID: string, pID: number, size: string) {
  return fetch(
    'http://localhost:3000/basket/' +
      userID +
      '/?productID=' +
      pID +
      '&size=' +
      size
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
    })
}

export const getUserData = async(inputEmail) => {
  const data = axios
  .get("http://localhost:3000/customer/login/" + inputEmail, {})
  .then(res => {
      console.log(res.data)
      return res.data 
     
  })
  .catch((error) => {
      console.log(error)
      alert('Wrong Email');
  })
  return data;
}


/*
export function getUserNameFromEmail(email: string) {
  let user = getUserFromAPI(email)
  return user
}
*/