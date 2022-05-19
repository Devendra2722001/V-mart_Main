import Empty from "./Empty.gif";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const validation = (credentials) => {
    let error = {};
    if (!credentials.email) {
      error.email = "* email must required.";
    }
    if (!credentials.password) {
      error.password = "* password must required.";
    }
    return error;
  };

  const Checkforcart = async () => {
    let result = await fetch("https://vmart-api.herokuapp.com/myCartItem", {
      method: "GET",
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    //console.log("got cart data:-",result);
    //setCartItem(result.length);
    sessionStorage.setItem("Mycart", result.length);
  };

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const CongoAlert = () => {
    swal({
      title: "Welcome!",
      text: "Login Successfull....",
      icon: "success",
      button: "Okay!",
    });
    history.push("/");
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    //window.location.reload();

    setError(validation(credentials));
    const { email, password } = credentials;
    const res = await fetch("https://vmart-api.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.user.isAdmin === true) {
      localStorage.setItem("ImAdmin", true);
      localStorage.setItem("token", JSON.stringify(data.token));
      console.log("Admin Login Successfull");
      //localStorage.removeItem('token');
      history.push("/");
      window.location.reload();
    } else if (data.user.isVendor === true) {
      localStorage.setItem("ImVendor", true);
      localStorage.setItem("VendorId", data.user._id);
      localStorage.setItem("token", JSON.stringify(data.token));
      console.log("Vendor Login Successfull");
      history.push("/");
      window.location.reload();
    }

    {
      if ((data.status = data)) {
        localStorage.setItem("token", JSON.stringify(data.token));
        //window.alert("Login Successfull....");
        Checkforcart();
        CongoAlert();
        console.log("User Login Successfull");
        history.push("/");
      } else {
        window.alert("-- Invalid Credentials --");
      }
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={Empty} className="img-fluid" alt="Sample" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4">
            <form method="POST">
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Email ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter email id"
                    name="email"
                    value={credentials.email}
                    onChange={handleInputs}
                  />
                </div>
                {error.email && (
                  <span className="text-danger font-weight-bold">
                    {error.email}
                  </span>
                )}
                <div className="col-md-12 ">
                  <label className="labels">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="enter password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputs}
                  />
                </div>
                {error.password && (
                  <span className="text-danger font-weight-bold">
                    {error.password}
                  </span>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <NavLink to="/email" className="text-body">
                  Forgot password?
                </NavLink>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  id="login_btn-style"
                  onClick={LoginUser}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <NavLink to="/signup">Register</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
