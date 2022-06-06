import Empty from "./Empty.gif";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { loginValidation } from "./validation"
import axios from "axios";

const Login = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const Checkforcart = async () => {
    let token = localStorage.getItem("token");
    if(token){
    await axios.get("https://vmart-api.herokuapp.com/myCartItem", {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    }).then((res) => {
      console.log("responce of myCartItem :::", res);
      sessionStorage.setItem("Mycart",(res.data.length));
      console.log("responce of myCartItem length :::", res.data.length);

    })
  }};

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    setError(loginValidation(credentials));
    const { email, password } = credentials;
    if(email && password){
     await axios.post("https://vmart-api.herokuapp.com/login", { 
      email: email,
      password: password
     },{
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log("responce of login :::", res);
      let data = res.data
      console.log("response data:-",data);
      if ((res.status === 200)) {
        localStorage.setItem("token", JSON.stringify(data.token));
        swal({
          title: "Welcome!",
          text: "Login Successfull....",
          icon: "success",
          button: "Okay!",
        });
        console.log("User Login Successfull");
        if (data.user.isAdmin === false && data.user.isVendor === false) {
          localStorage.setItem("ImAdmin", false);
          localStorage.setItem("token", JSON.stringify(data.token));
          
          Checkforcart();
          console.log("User Login Successfull");
          history.push("/");
        } 
        else if (data.user.isAdmin === true && data.user.isVendor === false) {
          localStorage.setItem("ImAdmin", true);
          localStorage.setItem("token", JSON.stringify(data.token));
          console.log("Admin Login Successfull");
          history.push("/");
          window.location.reload();
        }
        else if (data.user.isVendor === true && data.user.isAdmin === false) {
          localStorage.setItem("ImVendor", true);
          localStorage.setItem("VendorId", data.user._id);
          localStorage.setItem("token", JSON.stringify(data.token));
          console.log("Vendor Login Successfull");
          history.push("/");
          window.location.reload();
        }
      }
    }).catch((error) =>{
      if(error.response.status === 401){
        swal({
          title: "Opps...!",
          text: "Invalid credentials!",
          icon: "warning",
          button: "Okay!",
        });
      }else if((error.response.status === 500)){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You are not registered!',
          footer: '<a href="SignUp">Register hear</a>'
        })
      }else if((error.response.status === 400)){
        localStorage.setItem("Email", email)
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'First verify your Email',
          footer: '<a href="EmailVerification">Make verification?</a>'
        })
      }
    })
    }
  }   


 
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
                  onClick={loginUser}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  id="login_btn-style"
                  onClick={()=> history.push("/")}
                >
                  Cancel
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
