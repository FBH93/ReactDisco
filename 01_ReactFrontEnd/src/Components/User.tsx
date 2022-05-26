import { atom, useAtom } from "jotai"
import { getUserData } from "../Services/UserCall"

export interface UserInterface {
    firstName: string
    lastName: string
    address: number
    email: string
    password: string
    customerID: string
  }