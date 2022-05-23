import { atom } from 'jotai'
import { BasketProduct } from './Basket'

export const loginAtom = atom(false)
export const sizeAtom = atom('S')
export const localCartAtom = atom<BasketProduct[] | null>([ {
    productID: 1,
    productName: 'Disco pants',
    productPrice: 899,
    style: 'Sportswear',
    type: 'pants',
    size: 'M'
  },
  {
    productID: 2,
    productName: 'Disco jacket',
    productPrice: 349,
    style: 'Sportswear',
    type: 'jackets',
    size: 'M'
  },
  {
    productID: 3,
    productName: 'Disco headband',
    productPrice: 149,
    style: 'Sportswear',
    type: 'accesories',
    size: 'M'
  }])
