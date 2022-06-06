import Empty from "./Empty.gif";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { signUpValidation} from "./validation"
import axios from "axios";
// import validation from "./validation";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  

  const [error, setError] = useState({});

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    setError(signUpValidation(user));
    const { fname, lname, email, password, cpassword } = user;
    if(fname && lname && email && password && cpassword && password.length >= 8 && password=== cpassword){
      await axios.post("https://vmart-api.herokuapp.com/registration", {
        firstName: fname,
        lastName: lname,
        email: email,
        password: password,
        con_password: cpassword,
      },
      {
      headers: {
        "Content-Type": "application/json",
      }
      }).then((res)=>{
        console.log(res);
        if(res.status === 201){
          localStorage.setItem("Email", email); 
          swal({
            title: "Success!",
            text: "Check your email for confirmation OTP.",
            icon: "success",
            button: "Okay!",
          });
          //console.log("Successfull Registration");
          history.push("/emailVerification");
        }

      }).catch((error) => {
        if (error.response.status === 400) {
          swal({
            title: "warning!",
            text: "This user already exist.",
            icon: "warning",
            button: "Okay!",
          });
        } 
      })
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
              <div className="row mt-2 needs-validation">
                <div className="col-md-6">
                  <label className="labels">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter Firstname"
                    required=""
                    name="fname"
                    value={user.fname}
                    onChange={handleInputs}
                  />
                  {error.fname && (
                    <span className="text-danger font-weight-bold">
                      {error.fname}
                    </span>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="labels">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Last name"
                    required=""
                    name="lname"
                    value={user.lname}
                    onChange={handleInputs}
                  />
                  {error.lname && (
                    <span className="text-danger font-weight-bold">
                      {error.lname}
                    </span>
                  )}
                </div>
                <div className="col-md-12">
                  <label className="labels">Email ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email "
                    name="email"
                    value={user.email}
                    onChange={handleInputs}
                  />
                  {error.email && (
                    <span className="text-danger font-weight-bold">
                      {error.email}
                    </span>
                  )}
                </div>
                <div className="col-md-12">
                  <label className="labels">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={user.password}
                    onChange={handleInputs}
                  />
                  {error.password && (
                    <span className="text-danger font-weight-bold">
                      {error.password}
                    </span>
                  )}
                </div>
                <div className="col-md-12">
                  <label className="labels">Comfirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter comfirm password"
                    name="cpassword"
                    value={user.cpassword}
                    onChange={handleInputs}
                  />
                  {error.cpassword && (
                    <span className="text-danger font-weight-bold">
                      {error.cpassword}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-center text-lg-start pt-2 mt-3">
                <button
                  className="btn btn-danger btn-lg  "
                  id="login_btn-style"
                  type="button"
                  onClick={()=>{history.go(-1)}}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  id="login_btn-style"
                  value="register"
                  onClick={postData}
                >
                  Signup
                </button>

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?
                  <NavLink to="/login">Login</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
