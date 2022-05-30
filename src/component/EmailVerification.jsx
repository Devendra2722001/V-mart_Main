import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Empty from "./Empty.gif";
import swal from "sweetalert";
import Swal from "sweetalert2";

// take otp from user for email verofication

const EmailVerification = () => {
  const history = useHistory();

  const [OTP, setOTP] = useState({
    otp: "",
  });

  const validation = (OTP) => {
    let error = {};
    if (!OTP.otp) {
      error.otp = "* enter otp.";
    }
    return error;
  };

  const [error, setError] = useState({});

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setOTP({ ...OTP, [name]: value });
  };

  const checkOTP = async (e) => {
    //localStorage.setItem("emailid" , email.emailID);
    e.preventDefault();
    setError(validation(OTP));
    const { otp } = OTP;
    if(otp){
      let res = await fetch("http://localhost:8000/verificationOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
        body: JSON.stringify({
          verificationOTP: otp,
          email : localStorage.getItem("Email")
        }),
      });

      if (res.status === 201) {
        swal({
          title: "Success!",
          text: "Now you are registered",
          icon: "success",
          button: "Okay!",
        });
        console.log("Successfull Registration");
        history.push("/login");
        localStorage.removeItem('Email');
      } else if (res.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'OTP did not match!',
          //footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    }
     
  };

  const resendOTP = async (e) => {
    //localStorage.setItem("emailid" , email.emailID);
    e.preventDefault();
    //setError(validation(OTP));
    //const { otp } = OTP;
    //if(otp){
      let res = await fetch("http://localhost:8000/resendOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
        body: JSON.stringify({
          //verificationOTP: otp,
          email : localStorage.getItem("Email")
        }),
      });

      if (res.status === 201) {
        swal({
          title: "Success!",
          text: "OTP resended on your email",
          icon: "success",
          button: "Okay!",
        });
        //console.log("Successfull Registration");
        //history.push("/login");
        //localStorage.removeItem('Email');
      } else if (res.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'something went wrong!',
          //footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    //}
     
  };
  console.log(OTP)

  

  return (
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src={Empty} className="img-fluid" alt="Sample" />
      </div>

      <div className="col-md-8 col-lg-6 col-xl-4">
        <input
          type="text"
          className="form-control"
          placeholder="enter OTP"
          name="otp"
          value={OTP.otp}
          onChange={handleInputs}
        />
        {error.otp && (
          <span className="text-danger font-weight-bold">{error.otp}</span>
        )}
        <br></br>
        <NavLink to="/login">
          <button
            className="btn btn-primary profile-button"
            type="button"
            onClick={checkOTP}
          >
            Verify Account
          </button>
        </NavLink>&nbsp;&nbsp;
        <button
            className="btn btn-primary profile-button"
            type="button"
            onClick={resendOTP}
          >
            Resend OTP
          </button>
      </div>
    </div>
  );
};

export default EmailVerification;
