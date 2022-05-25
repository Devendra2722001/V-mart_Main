import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Empty from "./Empty.gif";
import swal from "sweetalert";

const Email = () => {
  const history = useHistory();

  const [email, setEmail] = useState({
    emailID: "",
  });
  const token = localStorage.getItem("token")

  const validation = (email) => {
    let error = {};
    if (!email.emailID) {
      error.email = "* to get otp, email must required.";
    }
    return error;
  };

  const [error, setError] = useState({});

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setEmail({ ...email, [name]: value });
  };

  const SendOTP = async (e) => {
    //localStorage.setItem("emailid" , email.emailID);
    e.preventDefault();
    setError(validation(email));
    
    const { emailID } = email;
    if(emailID){
      let res = await fetch("http://localhost:8000/sendotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
          email: emailID,
        }),
      });
      if (res.status === 200) {
        swal({
          title: "",
          text: "OTP send on given email ID.",
          icon: "success",
          button: "Okay!",
        });
        history.push("/ResetPassword");
      } else if (res.status === 400) {
        swal({
          title: "Opps...!",
          text: "No user with this Email ID!",
          icon: "warning",
          button: "Okay!",
        });
      }
    }
  };

  return (
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src={Empty} className="img-fluid" alt="Sample" />
      </div>

      <div className="col-md-8 col-lg-6 col-xl-4">
        <label className="labels">Email ID</label>
        <input
          type="text"
          className="form-control"
          placeholder="enter email id"
          name="emailID"
          value={email.emailID}
          onChange={handleInputs}
        />
        {error.email && (
          <span className="text-danger font-weight-bold">{error.email}</span>
        )}
        <br></br>
        <NavLink to="/ResetPassword">
          <button
            className="btn btn-primary profile-button"
            type="button"
            onClick={SendOTP}
          >
            Send OTP
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Email;
