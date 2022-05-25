import axios from 'axios'

//get products from API
function getUserFromAPI(email: string) {
  return 'http://localhost:3000/customer/' + email
}
export async function putProductToBasket(userID: string, pID: number, size: string) {
  return fetch('http://localhost:3000/basket/' + userID + '/?productID=' + pID +'&size=' + size, {
          method: 'PUT',
        }
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
