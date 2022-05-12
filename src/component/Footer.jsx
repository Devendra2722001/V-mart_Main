import React from "react";
import { NavLink } from "react-router-dom";

const linkme = () => {
    window.location.href = "mailto:info@vonalsys.com";
};

const linkmetww = () => {
    window.location.href = "https://twitter.com/volansys";
};

const linkmeface = () => {
    window.location.href = "https://www.facebook.com/volansystechnologies";
};

const linkmelinkedin = () => {
    window.location.href = "https://www.linkedin.com/company/volansys";
};

const linkmemap = () => {
    window.location.href = "https://www.google.com/maps/dir/23.0208241,72.5086395/volansys+map/@23.0152921,72.5010664,16z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x395e8364844fffff:0x5bd95b41ea59f9c!2m2!1d72.5057008!2d23.009711";
};


const Footer = () => {

    return (
        <>
            <div class="footer">
                <footer class="footer-section">
                    <div class="container">
                        <div>
                            <div class="footer-1st">
                                <div>
                                    <div id="footer-1st_lines">
                                        <span class="fa fa-map-marker" id="fa_big" onClick={linkmemap}></span>
                                        <div class="cta-text">
                                            <h4>Find us</h4>
                                            <span>Prahlad Nagar, Ahmedabad, Gujarat 380015</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="call_us_footer" id="footer-1st_lines">
                                        <i class="fa fa-phone" id="fa_big"></i>
                                        <div class="cta-text">
                                            <h4>Call us</h4>
                                            <span>079 4004 1994</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div id="footer-1st_lines"> 
                                        <i class="fa fa-envelope-open" id="fa_big" onClick={linkme}></i>
                                        <div class="cta-text">
                                            <h4>Mail us</h4>
                                            <span onClick={linkme}>info@vonalsys.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="footer-2nd" id="footer-2nd">
                                <div>
                                    <div class="footer-widget">
                                        <div class="footer-logo">
                                            <a href="/"><img src="../images/logo_gold.png" class="img-fluid" alt="logo" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="footer-text">
                                        <p>Visit www.Volansys.com For More Info</p>
                                        <NavLink to="/vendorsignup">
                                            <p>Vendor Signup ?</p>
                                        </NavLink>
                                    </div>
                                </div>
                                <div>
                                    <div class="footer-social-icon_All">
                                        
                                        <div class="fa fa-facebook" id ="footer-social-icon_All" onClick={linkmeface}>

                                        </div>
                                        <div class="fa fa-twitter" id ="footer-social-icon_All" onClick={linkmetww}>

                                        </div>
                                        <div class="fa fa-linkedin" id ="footer-social-icon_All" onClick={linkmelinkedin}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Footer;



