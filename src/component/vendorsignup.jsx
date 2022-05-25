import Empty from "./Empty.gif";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import swal from "sweetalert";
//import validation from "./validation";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    isVendor: "true",
  });

  let validation = (user) => {

    let error={};

    if(!user.fname){
        error.fname = "* First name must required."
    }
    if(!user.lname){
        error.lname = "* Last name must required."
    }
    if(!user.email){
        error.email = "* Email must required."
    }
    if(!user.password){
        error.password = "* Password must required."
    }
    else if(user.password.length < 8){
        error.password = "* Minimum length of password is 8 charecter."
    }
    if(!user.cpassword){
        error.cpassword = "* Confirm password must required."
    }
    else if(user.cpassword !== user.password){
        error.cpassword = "* Password and Confirm password not match."
    }
  return error;
  }

  const [error, setError] = useState({});

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    setError(validation(user));
    const { fname, lname, email, password, cpassword, isVendor } = user;
    if(fname && lname && email && password && cpassword && isVendor && password.length >= 8 && password=== cpassword){
      let data = await fetch("http://localhost:8000/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        firstName: fname,
        lastName: lname,
        email: email,
        password: password,
        con_password: cpassword,
        isVendor: isVendor,
      }),
    });

    // data = await data.json();
    // data = await data.json();
      if (data.status === 400) {
        swal({
          title: "warning!",
          text: "This user already exist.",
          icon: "warning",
          button: "Okay!",
        });
      } else if(data.status === 201){
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
            <p>
              <h2 className="text-center" style={{ color: "black" }}>
                <b>
                  <tt>Vendor SignUp</tt>
                </b>
              </h2>
            </p>
            <form method="POST">
              <div className="row needs-validation">
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
                {/* <div className="col-md-12">
                  <label className="labels">Select Role</label><br></br>
                  <input type="radio" name="isVendor" value={user.isVendor} onChange={handleInputs} defaultChecked/> Vendor &nbsp;
                </div> */}
              </div>
              <div className="text-center text-lg-start pt-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  id="login_btn-style"
                  value="register"
                  onClick={PostData}
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
