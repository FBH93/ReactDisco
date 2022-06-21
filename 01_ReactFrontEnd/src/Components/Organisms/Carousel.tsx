import { Carousel } from "react-bootstrap"
import Headline from "../Atoms/Headline"

//Displays the sliding hero image on the front page.
export default function Caroussel() {
  return (
    <Carousel className="discoCarousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="\assets\img\content\img-hero.jpg"
          alt="Welcome Disco Slide"
        />
        <Carousel.Caption>
          {localStorage.getItem("isLoggedIn") === "true" ? (
            <>
              <h3>Hello {localStorage.getItem("firstName")}</h3>
              <p>Welcome to a blast from the past.</p>
            </>
          ) : (
            <>
              <Headline text="Welcome to a blast from the past." />
              <p>Consider creating an account or logging in!</p>
            </>
          )}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="\assets\img\content\img-cart.jpg"
          alt="Promotion Disco Slide"
        />

        <Carousel.Caption>
          <Headline text="Fashion goes around and around, but disco stays the same." />
          <p>DiscoClothing has everything you need to be the grooviest you!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
