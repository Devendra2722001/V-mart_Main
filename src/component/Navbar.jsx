import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import login from "./login.png";
import logout from "./logout.png";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const Navbar = () => {
  const history = useHistory();
  const [logBtn, setlogBtn] = useState(login);
  const [cartItem, setCartItem] = useState();

  useEffect(() => { 
    //Checkforcart();
    setInterval(() => {     
      const token = localStorage.getItem("token");
      if (token != null) {
        setlogBtn(logout);  
        setCartItem(sessionStorage.getItem("Mycart"));
        //console.log(cartItem);     
      }
    }, 1000);

  }, []);  
  
  //console.log("cartItem",cartItem);  
  

  const CongoAlert = () => {
    swal({
      title: "Cya Later!",
      text: "Logout Successfull....",
      icon: "success",
      button: "Okay!",
    });

    setCartItem("");
    //localStorage.removeItem("token");
    history.push("/");    
  };


  const ProtectedRoute = (props) => {
    const token = localStorage.getItem("token");
    if (token === null) {
      setlogBtn(logout);
    } else {
      setlogBtn(logout);
    }
  };

  const Dologout = async () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("Mycart");
    //window.alert("-- Logout Successfuly  --");
    CongoAlert();
    setlogBtn(login);
  };

  const DoLoginout = () => {
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

  console.log("cartItem Navbar",cartItem);

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

          {/* <div id="searchbar">

                        <form className="d-flex">
                            <input className="form-control" type="search" placeholder="Search Here..." aria-label="Search" />
                        </form>
                    </div> */}
          <div className="Nav-menu-options">
            <div id="bloc3" className="push">
              <NavLink to="/cart">
                <div className="text_cart">{cartItem}</div>
                <img
                  src="../images/cart.png"
                  width="30rem;"
                  title="Your Cart"
                  alt="cart"
                ></img>
              </NavLink>
            </div>

            <div id="bloc4" className="push">
              <NavLink to="/favorites">
                <img
                  src="../images/heart.png"
                  width="30rem;"
                  title="Favorites"
                  alt="favorits"
                ></img>
              </NavLink>
            </div>

            <div id="bloc5" className="push">
              <NavLink to="/user">
                <img
                  src="../images/user.png"
                  title="Your Profile"
                  width="30rem;"
                  alt="profile"
                ></img>
              </NavLink>
            </div>

            <div id="bloclog" className="push">
              <img
                src={logBtn}
                width="30rem;"
                alt="Login/Logout"
                title="Login/Logout"
                onClick={() => {
                  DoLoginout();
                }}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
