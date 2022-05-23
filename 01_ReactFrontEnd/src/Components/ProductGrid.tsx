import ProductsCall from '../Services/ProductsCall'
import { ProductInterface } from '../Components/Product'
import Sizometer from './Atoms/Sizometer'
import { useState, useEffect } from 'react'
import { CardButton } from './Atoms/CardButton'
import { Alert } from 'react-bootstrap'
import { getAPI } from '../Services/ProductsCall'
import { useAtom } from 'jotai'
import { sizeAtom } from './store'

export type Filter = {
  filter1: string
  filter2: string
}

function ProductGrid(filter: Filter, props) {
  const [products, setProducts] = useState<ProductInterface[]>([])
  const [selectedSize, setproductize] = useAtom(sizeAtom)

  const API = getAPI(filter)
  console.log(filter)

  useEffect(() => {
    const fetchProducts = async () => {
      fetch(API)
        .then((res) => res.json())
        .then((res) => {
          console.log(res) //This prints twice, for some reason??
          setProducts(res)
        })
    }

    fetchProducts()
  }, [API])

  if (products) {
    return (
      <div className="container discoGrid justify-content-center d-flex flex-wrap mt-5">
        <>
          {products.map((product, i) => {
            return (
              <div
                className={
                  'discoCard ' +
                  (filter.filter1 === 'featured=yes' ? 'show' : 'hidden')
                }
                key={i}
              >
                <a
                  className="shopGridLink"
                  href={'/products/' + product.productID}
                  style={{ color: '#455f58' }}
                >
                  <h1 id="productName" className="fs-2 text-center">
                    {product.productName}
                  </h1>
                  <img
                    className="mt-5 mb-5"
                    id="productImage"
                    src={'/assets/img/products/' + product.productID + '.jpg'}
                    alt-text="productImage"
                    width="300px"
                  />
                  <h1 id="productName-1" className="fs-3 fw-light text-center">
                    {product.productPrice + ' DKK'}
                  </h1>
                </a>
                <Sizometer />
                <CardButton pID={product.productID} size={selectedSize} />
              </div>
            )
          })}
        </>
      </div>
    )
  } else return <div> FAULTY FILTER </div>
}

export default ProductGrid
