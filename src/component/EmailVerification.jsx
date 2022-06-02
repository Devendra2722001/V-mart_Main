import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Empty from "./Empty.gif";
import swal from "sweetalert";
import Swal from "sweetalert2";
import axios from "axios";
import {emailVerificationValidation} from "./validation"

const EmailVerification = () => {
  const history = useHistory();

  const [OTP, setOTP] = useState({
    otp: "",
  });

  const [error, setError] = useState({});

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setOTP({ ...OTP, [name]: value });
  };

  const checkOTP = async (e) => {
    e.preventDefault();
    setError(emailVerificationValidation(OTP));
    const { otp } = OTP;
    if(otp){
      await axios.post("http://localhost:8000/verificationOTP", {
        verificationOTP: otp,
        email : localStorage.getItem("Email")
      }, {
      headers: {
        "Content-Type": "application/json",
      },
      }).then((res) => {
        console.log("responce of v erification otp",res);
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
        } 
      }).catch((error) => {
          if (error.response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'OTP did not match!',
          })
        }
      })
    }
  };

  const resendOTP = async (e) => {
    e.preventDefault();
      await axios.post("http://localhost:8000/resendOTP",{email : localStorage.getItem("Email")}, {
      headers: {
        "Content-Type": "application/json",
      },
      }).then((res) =>{
        console.log("responce of resend otp", res);
        if (res.status === 201) {
          swal({
            title: "Success!",
            text: "OTP resended on your email",
            icon: "success",
            button: "Okay!",
          });
        }
      }).catch ((error) => {
        if (error.response.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'something went wrong!',
          })
        }
      })
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
        </NavLink>
        &nbsp;&nbsp;
        <button
          className="btn btn-danger profile-button"
          type="button"
          onClick={() => {
            history.go(-1);
          }}
        >
          Cancel
        </button>
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
