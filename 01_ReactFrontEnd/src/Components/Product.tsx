import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../Services/ProductsCall'
import { CardButton } from './Atoms/CardButton'
import { sizeAtom } from './store'

export interface ProductInterface {
  productID: number
  productName: string
  productPrice: number
  style: string
  type: string
  details: string
}

const Product = () => {
  let { id } = useParams()
  const [selectedSize, setproductize] = useAtom(sizeAtom)

  const [myProduct, setMyProduct] = useState<ProductInterface | null>(null)

  useEffect(() => {
    const updateProduct = async () => {
      const myProduct = await getSingleProduct(id)
      setMyProduct(myProduct)
    }
    updateProduct()
  }, [id])

  if (!id) {
    return <>Error</>
  }

  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <div
              id="discoProductImage"
              style={{
                background:
                  'url("../assets/img/products/' + id + '.jpg") no-repeat',
                backgroundSize: 'contain',
                height: '512px',
              }}
            />
          </div>
          <div className="col mt-5">
            <h2 id="discoProductName">{myProduct?.productName}</h2>
            <div className="row">
              <div className="col">
              <p> {myProduct?.details} </p>
              <h4
                  id="discoProductPrice"
                  style={{ marginBottom: '25px', marginTop: '25px' }}
                >
                  {myProduct?.productPrice} DKK
              </h4>
                <div
                  className="btn-group btn-group-toggle"
                  style={{ paddingBottom: '16px' }}
                  data-toggle="buttons"
                >
                  <label className="btn btn-secondary">
                    <input
                      type="radio"
                      name="size"
                      id="S"
                      autoComplete="off"
                      onClick={(event) => {
                        setproductize('S')
                      }}
                      defaultChecked
                    />{' '}
                    S
                  </label>
                  <label className="btn btn-secondary">
                    <input
                      type="radio"
                      name="size"
                      id="M"
                      autoComplete="off"
                      onClick={(event) => {
                        setproductize('M')
                      }}
                    />{' '}
                    M
                  </label>
                  <label className="btn btn-secondary">
                    <input
                      type="radio"
                      name="size"
                      id="L"
                      autoComplete="off"
                      onClick={(event) => {
                        setproductize('L')
                      }}
                    />{' '}
                    L
                  </label>
                  <label className="btn btn-secondary">
                    <input
                      type="radio"
                      name="size"
                      id="XL"
                      autoComplete="off"
                      onClick={(event) => {
                        setproductize('XL')
                      }}
                    />{' '}
                    XL
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
              <CardButton pID={parseInt(id)} size={selectedSize} /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
