import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { NavLink } from "react-router-dom";

const Banner = () => {
    return (
        <Carousel className="carousel_slider">
        
        <Carousel.Item>
        <NavLink to={`/productList/6295a02b890cecb55ee34635`} id="copyright">
          <img
            id="BannerMargin"
            className="d-block w-100"
            src="images/Mobile_Banner_1.jpg"
            alt="iphone 13 max"
          />
         </NavLink>
        </Carousel.Item>
        
        <Carousel.Item>
        <NavLink to={`/productList/62a082ae7f1caf8b4b96c399`} id="copyright">
          <img
            id="BannerMargin"
            className="d-block w-100"
            src="images/Laptop_Banner.jpg"
            alt="nike Airforce 1'07"
          />
          </NavLink>
        </Carousel.Item>

        <Carousel.Item>
        <NavLink to={`/productList/62a0867d7f1caf8b4b96c3b9`} id="copyright">
          <img
            id="BannerMargin"
            className="d-block w-100"
            src="images/Shoes_Banner.jpg"
            alt="Macbook Pro 2022"
          />
          </NavLink>
        </Carousel.Item>

      </Carousel>
    )
}

export default Banner