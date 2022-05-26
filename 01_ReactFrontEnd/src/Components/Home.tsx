import { Card } from "react-bootstrap"
import { Headline } from "./Atoms/Headline"
import Footer from "./Atoms/Footer"
import ProductGrid from "./ProductGrid"
import Carousel from "./Atoms/Carousel"
import Background from "../Components/Background"

//NOTE Because of the forced width to 72rem, this is not responsive. 
export const Home = () => {
  return (
    <>
    <Carousel/>
    <Headline text="Featured this month" />
    <p style={{ textAlign: 'center' }}>Consider looking at one of this month's featured products! Disco fever guarenteed!</p>
    <ProductGrid filter1={"featured=yes"} filter2={"None"} />
    </>
  )
}
