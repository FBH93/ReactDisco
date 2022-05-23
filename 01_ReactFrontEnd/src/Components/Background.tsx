export const Background = () => {
  return (
    <div
      style={{
        background:
          'linear-gradient(rgba(83,115,106,0) 60%, rgba(0,0,0,0.5) 100%), url("/assets/img/content/img-hero.jpg"',
        width: '100%',
        height: '95vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="container d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex d-xxl-flex flex-column justify-content-end flex-sm-column flex-md-column flex-lg-column flex-xl-column flex-xxl-column justify-content-xxl-end align-items-xxl-start"
        style={{ height: '90vh' }}
      >
        <p className="fs-1 fw-bold text-white" id="welcomeMessage"></p>
        <h1
          className="fw-light text-white d-block"
          style={{ fontSize: '4rem' }}
        >
          Welcome to a blast of the past.
        </h1>
        <p
          className="fs-3 fw-lighter d-block"
          style={{ color: 'var(--bs-white)', marginBottom: '80px' }}
        ></p>
      </div>
    </div>
  )
}

export default Background
