import React from 'react';
import bgShowcaseImage1 from '../../public/assets/bg-showcase-1.jpg';
import bgShowcaseImage2 from '../../public/assets/bg-showcase-2.jpg';
import bgShowcaseImage3 from '../../public/assets/bg-showcase-3.jpg';

export function LandingPage() {
  return (
    <div>
      <header
        className="masthead"
        style={{ paddingBottom: '90px', paddingTop: '90px' }}
      >
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="text-center text-white">
                {/* Page heading */}
                <h1 className="mb-5">
                  Manage your bookmarks like never before!
                </h1>
                <div
                  className="mb-5"
                  style={{
                    fontSize: '1.2rem',
                  }}
                >
                  <div>
                    Tired of scrolling through dozens of saved bookmarks to find
                    the rght one?
                  </div>
                  <div>Have no idea why this bookmark was saved?</div>
                  <div>
                    Want to share a bunch of bookmarks and have to copy them
                    one-by-one?{' '}
                  </div>
                  <div>Never go back to the saved bookmark?</div>
                </div>
                <h1>Try BookIt!</h1>
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
                  <i
                    className="bi bi-filter-square m-auto text-primary"
                    style={{ color: '#ec104d' }}
                  ></i>
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
              <h2>Filter and sort bookmarks</h2>
              <p className="lead mb-0">
                Filter and sort bookmarks by tags, notes and other attributes
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
              <h2>Share your bookmarks lists with friends</h2>
              <p className="lead mb-0">
                Easily share filtered bookmark lists with few mouse clicks
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
              <h2>Monitor your reading habits</h2>
              <p className="lead mb-0">
                Track how many of saved bookmarks you have actually read
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
              <div className="testimonial-item mx-auto mb-5">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/RK.jpg"
                  alt="..."
                />
                <h5>Ross Kulyk</h5>
                <p>Fullstack Software Engineer</p>
                <p
                  className="font-weight-light mb-0"
                  style={{
                    fontSize: '1.5rem',
                  }}
                >
                  <a
                    style={{
                      marginLeft: '5%',
                      marginRight: '5%',
                    }}
                    href="https://www.linkedin.com/in/rostyslav-kulyk-150300179/"
                  >
                    <i className="bi bi-linkedin m-auto text-primary"></i>
                  </a>
                  <a
                    style={{
                      marginLeft: '5%',
                      marginRight: '5%',
                    }}
                    href="https://github.com/rossKulyk"
                  >
                    <i className="bi bi-github m-auto text-primary"></i>
                  </a>
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/EK.jpeg"
                  alt="..."
                />
                <h5>Elena Kot</h5>
                <p>Fullstack Software Engineer</p>
                <p
                  className="font-weight-light mb-0"
                  style={{
                    fontSize: '1.5rem',
                  }}
                >
                  <a
                    style={{
                      marginLeft: '5%',
                      marginRight: '5%',
                    }}
                    href="https://www.linkedin.com/in/elenakot/"
                  >
                    <i className="bi bi-linkedin m-auto text-primary"></i>
                  </a>
                  <a
                    style={{
                      marginLeft: '5%',
                      marginRight: '5%',
                    }}
                    href="https://github.com/elenakot"
                  >
                    <i className="bi bi-github m-auto text-primary"></i>
                  </a>
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/PM.jpeg"
                  alt="..."
                />
                <h5>Peter Myer</h5>
                <p>Fullstack Software Engineer</p>
                <p
                  className="font-weight-light mb-0"
                  style={{
                    fontSize: '1.5rem',
                  }}
                >
                  <a
                    style={{
                      marginLeft: '5%',
                      marginRight: '5%',
                    }}
                    href="https://www.linkedin.com/in/petermyer/"
                  >
                    <i className="bi bi-linkedin m-auto text-primary"></i>
                  </a>
                  <a
                    style={{
                      marginLeft: '5%',
                      marginRight: '5%',
                    }}
                    href="https://github.com/PeterMyer"
                  >
                    <i className="bi bi-github m-auto text-primary"></i>
                  </a>
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/GT.jpeg"
                  alt="..."
                />
                <h5>Grace Tveit</h5>
                <p>Fullstack Software Engineer</p>
                <p
                  className="font-weight-light mb-0"
                  style={{
                    fontSize: '1.5rem',
                  }}
                >
                  <a
                    style={{
                      marginLeft: '5%',
                      marginRight: '5%',
                    }}
                    href="https://www.linkedin.com/in/gracetveit/"
                  >
                    <i className="bi bi-linkedin m-auto text-primary"></i>
                  </a>
                  <a
                    style={{
                      marginLeft: '5%',
                      marginRight: '5%',
                    }}
                    href="https://github.com/gracetveit"
                  >
                    <i className="bi bi-github m-auto text-primary"></i>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Call to Action--> */}
      <section class="call-to-action text-white text-center" id="signup">
        <div class="container position-relative">
          <div class="row justify-content-center">
            <div class="col-xl-6">
              <h2 class="mb-4">Ready to get started? Sign up now!</h2>

              <div className="col-auto">
                <button className="btn btn-primary btn-lg" id="submitButton">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
