import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-row">
                    <div>
                        <h3>BookIT</h3>
                        <p>
                            Praesent sed lobortis mi. Suspendisse vel placerat
                            ligula. Vivamus ac sem lacus. Ut vehicula rhoncus
                            elementum. Etiam quis tristique lectus. Aliquam in
                            arcu eget velit pulvinar dictum vel in justo.
                        </p>
                    </div>
                    <div className="footer-social">
                        <a href="#">
                            <i className="icon ion-social-facebook"></i>
                        </a>
                        <a href="#">
                            <i className="icon ion-social-twitter"></i>
                        </a>
                        <a href="#">
                            <i className="icon ion-social-snapchat"></i>
                        </a>
                        <a href="#">
                            <i className="icon ion-social-instagram"></i>
                        </a>
                    </div>
                </div>
                <p className="copyright">FullstackAcademy © 2021</p>
            </div>
        </footer>
    );
};

export default Footer;
