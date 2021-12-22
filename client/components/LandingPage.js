import React from 'react';
import bgShowcaseImage1 from '../../public/assets/bg-showcase-1.jpg';
import bgShowcaseImage2 from '../../public/assets/bg-showcase-2.jpg';
import bgShowcaseImage3 from '../../public/assets/bg-showcase-3.jpg';

export function LandingPage() {
  return (
    <div>
      <header className="masthead">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="text-center text-white">
                {/* Page heading */}
                <h1 className="mb-5">
                  Manage your bookmarks like never before!
                </h1>
                {/* <!-- Signup form-->
                            <!-- * * * * * * * * * * * * * * *-->
                            <!-- * * SB Forms Contact Form * *-->
                            <!-- * * * * * * * * * * * * * * *-->
                            <!-- This form is pre-integrated with SB Forms.-->
                            <!-- To make this form functional, sign up at-->
                            <!-- https://startbootstrap.com/solution/contact-forms-->
                            <!-- to get an API token!--> */}
                <form
                  className="form-subscribe"
                  id="contactForm"
                  data-sb-form-api-token="API_TOKEN"
                >
                  {/* <!-- Email address input--> */}
                  <div className="row">
                    <div className="col">
                      <input
                        className="form-control form-control-lg"
                        id="emailAddress"
                        type="email"
                        placeholder="Email Address"
                        data-sb-validations="required,email"
                      />
                      <div
                        className="invalid-feedback text-white"
                        data-sb-feedback="emailAddress:required"
                      >
                        Email Address is required.
                      </div>
                      <div
                        className="invalid-feedback text-white"
                        data-sb-feedback="emailAddress:email"
                      >
                        Email Address Email is not valid.
                      </div>
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn btn-primary btn-lg disabled"
                        id="submitButton"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  {/* <!-- Submit success message-->
                                <!---->
                                <!-- This is what your users will see when the form-->
                                <!-- has successfully submitted--> */}
                  <div className="d-none" id="submitSuccessMessage">
                    <div className="text-center mb-3">
                      <div className="fw-bolder">
                        Form submission successful!
                      </div>
                      <p>To activate this form, sign up at</p>
                      <a
                        className="text-white"
                        href="https://startbootstrap.com/solution/contact-forms"
                      >
                        https://startbootstrap.com/solution/contact-forms
                      </a>
                    </div>
                  </div>
                  {/* <!-- Submit error message-->
                                <!---->
                                <!-- This is what your users will see when there is-->
                                <!-- an error submitting the form--> */}
                  <div className="d-none" id="submitErrorMessage">
                    <div className="text-center text-danger mb-3">
                      Error sending message!
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- Icons Grid--> */}
      <section className="features-icons bg-light text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="bi bi-filter-square m-auto text-primary"></i>
                </div>
                <h3>Filter and sort bookmarks</h3>
                <p className="lead mb-0">
                  You can filter and sort them by tags, notes and other
                  attributes
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="bi bi-share m-auto text-primary"></i>
                </div>
                <h3>Share your bookmarks lists with friends</h3>
                <p className="lead mb-0">
                  Easily share filtered bookmark lists with few mouse clicks
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="bi bi-card-checklist m-auto text-primary"></i>
                </div>
                <h3>Monitor your reading habits</h3>
                <p className="lead mb-0">
                  Track how many of saved bookmarks you have actually read
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Image Showcases--> */}
      <section className="showcase">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div
              className="col-lg-6 order-lg-2 text-white showcase-img"
              style={{
                backgroundImage: `url(${bgShowcaseImage1})`,
              }}
            ></div>
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2>Fully Responsive Design</h2>
              <p className="lead mb-0">
                When you use a theme created by Start Bootstrap, you know that
                the theme will look great on any device, whether it's a phone,
                tablet, or desktop the page will behave responsively!
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div
              className="col-lg-6 text-white showcase-img"
              style={{
                backgroundImage: `url(${bgShowcaseImage2})`,
              }}
            ></div>
            <div className="col-lg-6 my-auto showcase-text">
              <h2>Updated For Bootstrap 5</h2>
              <p className="lead mb-0">
                Newly improved, and full of great utility classNamees, Bootstrap
                5 is leading the way in mobile responsive web development! All
                of the themes on Start Bootstrap are now using Bootstrap 5!
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div
              className="col-lg-6 order-lg-2 text-white showcase-img"
              style={{
                backgroundImage: `url(${bgShowcaseImage3})`,
              }}
            ></div>
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2>Easy to Use & Customize</h2>
              <p className="lead mb-0">
                Landing Page is just HTML and CSS with a splash of SCSS for
                users who demand some deeper customization options. Out of the
                box, just add your content and images, and your new landing page
                will be ready to go!
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Team--> */}
      <section className="testimonials text-center bg-light">
        <div className="container">
          <h2 className="mb-5">Our Team</h2>
          <div className="row">
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/img/testimonials-1.jpg"
                  alt="..."
                />
                <h5>Ross Kulyk</h5>
                <p className="font-weight-light mb-0">
                  "This is fantastic! Thanks so much guys!"
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/img/testimonials-2.jpg"
                  alt="..."
                />
                <h5>Elena Kot</h5>
                <p className="font-weight-light mb-0">
                  "Bootstrap is amazing. I've been using it to create lots of
                  super nice landing pages."
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/img/testimonials-2.jpg"
                  alt="..."
                />
                <h5>Peter Myer</h5>
                <p className="font-weight-light mb-0">
                  "Bootstrap is amazing. I've been using it to create lots of
                  super nice landing pages."
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/img/testimonials-3.jpg"
                  alt="..."
                />
                <h5>Grace Tveit</h5>
                <p className="font-weight-light mb-0">
                  "Thanks so much for making these free resources available to
                  us!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
