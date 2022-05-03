import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { NavLink } from "react-router-dom";

const Banner = () => {
    return (
        <Carousel className="carousel_slider">
        
        <Carousel.Item>
        <NavLink to={`/productList/626fa674910c4a8f2c5ca22c`} id="copyright">
          <img
            className="d-block w-100"
            src="images/banner1.png"
            alt="First slide"
          />
         </NavLink>
        </Carousel.Item>
        
        <Carousel.Item>
        <NavLink to={`/productList/626b98589e6557068652b227`} id="copyright">
          <img
            className="d-block w-100"
            src="images/banner2.png"
            alt="Second slide"
          />
          </NavLink>
        </Carousel.Item>

        <Carousel.Item>
        <NavLink to={`/productList/626fa7f2910c4a8f2c5ca241`} id="copyright">
          <img
            className="d-block w-100"
            src="images/banner3.png"
            alt="Third slide"
          />
          </NavLink>
        </Carousel.Item>

      </Carousel>
    )
}

export default Banner