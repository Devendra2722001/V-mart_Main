import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import login from "./login.png";
import logout from "./logout.png";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const Navbar = () => {
  const history = useHistory();
  const [logBtn, setlogBtn] = useState(login);
  const [cartItem, setCartItem] = useState();

  useEffect(() => { 
    setInterval(() => {     
      const token = localStorage.getItem("token");
      setCartItem(sessionStorage.getItem("Mycart"));
      if (token != null) {
        setlogBtn(logout);
      }
    }, 1000);

  }, [])   

  const CongoAlert = () => {
    swal({
      title: "Cya Later!",
      text: "Logout Successfull....",
      icon: "success",
      button: "Okay!",
    });

    setCartItem("");
    history.push("/") 
  };

  const Dologout = async () => {
    localStorage.removeItem("token") 
    sessionStorage.removeItem("Mycart") 
    CongoAlert();
    setlogBtn(login);
  };

  const doLoginout = () => {
    const token = localStorage.getItem("token");
    if (logBtn === login) {
      if (token === null) {
        setlogBtn(login);
      } else {
        setlogBtn(logout);
      }
      history.push("/login");
    } else {
      setlogBtn(logout);
      Dologout();
    }
  };

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
