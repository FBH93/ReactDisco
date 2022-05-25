import { Card } from "react-bootstrap"
import { Headline } from "./Atoms/Headline"
import Footer from "./Atoms/Footer"
import ProductGrid from "./ProductGrid"
import Carousel from "./Atoms/Carousel"


//NOTE Because of the forced width to 72rem, this is not responsive. 
export const Home = () => {
  return (
    <>
    <Card className="text-center">
      <Card.Img src="/assets/img/content/img-hero.jpg" />
      <Card.ImgOverlay>
        
        <Card bg="light" border="primary" style={{width: '72rem', marginLeft: 'auto', marginRight: 'auto', marginTop: '25px'}}>
          <Carousel/>
          <Headline text="Featured this month" />
          <Card.Body>
            <Card.Text>
              Consider looking at one of this month's featured products! Disco
              fever guarenteed!
            </Card.Text>
            <ProductGrid filter1={"featured=yes"} filter2={"None"} />
          </Card.Body>
        </Card>
      </Card.ImgOverlay>
    </Card>
    <Footer/>
    </>
  )
}
