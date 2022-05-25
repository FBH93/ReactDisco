import { Carousel } from "react-bootstrap";

export default function Caroussel() {
  return (
    <Carousel>
        <Carousel.Item>
              <img
                  className="d-block w-100"
                  src="\assets\img\content\disco-ball.jpg"
                  alt="First slide" />
            <Carousel.Caption>
              {localStorage.getItem('isLoggedIn') === 'true' ? (
                  <>
                  <h3>Hello {localStorage.getItem('firstName')}</h3>
                  <p>Welcome to a world of disco</p>
                  </>
              ) : (
                  <>
                  <h3>Welcome!</h3>
                  <p>Consider creating an account or logging in</p>
                  </>
              )}
              
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
              <img
                  className="d-block w-100"
                  src="\assets\img\content\night-at-disco.jpg"
                  alt="Second slide" />

              <Carousel.Caption>
                  <h3>Fashion goes around and around, but disco stays the same</h3>
                  <p>DiscoClothing has everything you need to be the grooviest you!</p>
              </Carousel.Caption>
          </Carousel.Item>
    </Carousel>
  )
}

/*
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
 */