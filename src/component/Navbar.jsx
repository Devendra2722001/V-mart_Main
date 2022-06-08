import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [cartItem, setCartItem] = useState();

  useEffect(() => { 
    setInterval(() => {
      setCartItem(sessionStorage.getItem("Mycart"));
    }, 500);

  }, [])   

  return (
    <div>
      <nav className="navbar" id="Navbar">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              src="../images/logo_gold.png"
              alt="Logo"
              className="navbar-brand"
            ></img>
          </NavLink>

          <div className="Nav-menu-options">
            <div id="bloc3" className="push">
              <NavLink to="/cart">
                <div className="text_cart">{cartItem}</div>
                <img
                  src="../images/1458205.png"
                  width="30rem;"
                  title="Your Cart"
                  alt="cart"
                ></img>
              </NavLink>
            </div>
         
            <div id="bloc5" className="push">
              <NavLink to="/user">
                <img
                  src="../images/1458201.png"
                  title="Your Profile"
                  width="30rem;"
                  alt="profile"
                ></img>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
