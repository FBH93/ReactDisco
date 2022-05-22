import {Col, Container, Row, Button} from 'react-bootstrap';

export const Account = () => {


  const logout = () => {
      localStorage.clear();
  } 

    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstname");
    const lastName = localStorage.getItem("name");
    const country = localStorage.getItem("country");
    const zip = localStorage.getItem("zip");
    const street = localStorage.getItem("street");
    const city = localStorage.getItem("city");

  return (
      <div>
      <div style={{background: 'linear-gradient(rgba(83,115,106,0) 60%, rgba(0,0,0,0.5) 100%), url(&quot', width: '100%', height: '30vh', marginBottom: '50px'}}>
          <Container className="container d-flex d-xxl-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center" style={{height: "30vh"}}>
              <Row className="row">
                  <Col className="col">
                      <h1 className="fs-1 fw-light text-center text-white" id="dashboardHeadline">Please login first.</h1>
                  </Col>
              </Row>
          </Container>
      </div>
      <div>
          <Container>
              <Row>
                  <Col className="col offset-sm-0 offset-md-1 offset-lg-1 offset-xl-2 offset-xxl-2">
                      <h1 className="fs-2 text-start" id="dashboardName">{firstName} {lastName}</h1>                                                                                                              
                      <h1 className="fs-3 fw-light text-start" id="dashboardEmail" style={{marginBottom: "16px"}}>{email}</h1>
                      <Button className="btn btn-primary dashboardLogout" type="button" onClick={logout} href="#home">Logout</Button>
                  </Col>
                  <Col className="col"></Col>
                  <Col className="col accountAddress">
                      <Row className="row">
                          <Col className="col">
                              <p id="dashboardStreet">{street}</p>
                          </Col>
                      </Row>
                      <Row style={{marginBottom: "16px"}}>
                          <Col className="col">
                              <p className="d-inline" id="dashboardZip" style={{marginRight: "8px"}}> {zip}</p>
                              <p className="d-inline" id="dashboardCity">{city}</p>
                          </Col>
                      </Row>
                      <Row >
                          <Col className="col">
                              <p id="dashboardCountry">{country}</p>
                          </Col>
                      </Row>
                  </Col>
              </Row>
          </Container>
      </div>
    </div>
  )
}

export default Account