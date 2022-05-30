import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { NavLink } from "react-router-dom";

const Banner = () => {
    return (
        <Carousel className="carousel_slider">
        
        <Carousel.Item>
        <NavLink to={`/productList/62834a47635a8f8828b45ac8`} id="copyright">
          <img
            className="d-block w-100"
            src="images/banner1.png"
            alt="iphone 13 max"
          />
         </NavLink>
        </Carousel.Item>
        
        <Carousel.Item>
        <NavLink to={`/productList/628f296dd516b474a4f17f0f`} id="copyright">
          <img
            className="d-block w-100"
            src="images/banner2.png"
            alt="nike Airforce 1'07"
          />
          </NavLink>
        </Carousel.Item>

        <Carousel.Item>
        <NavLink to={`/productList/628f0d607e2e971a3add430d`} id="copyright">
          <img
            className="d-block w-100"
            src="images/banner3.png"
            alt="Macbook Pro 2022"
          />
          </NavLink>
        </Carousel.Item>

      </Carousel>
    )
}

export default Banner