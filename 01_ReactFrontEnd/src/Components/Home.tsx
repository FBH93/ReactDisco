import { Headline } from "./Atoms/Headline"
import ProductGrid from "./ProductGrid"
import Carousel from "./Atoms/Carousel"

export const Home = () => {
  return (
    <>
      <Carousel />
      <Headline text="Featured this month" />
      <p style={{ textAlign: "center" }}>
        Consider looking at one of this month's featured products! Disco fever
        guarenteed!
      </p>
      <ProductGrid filter1={"featured=yes"} filter2={"None"} />
    </>
  )
}
