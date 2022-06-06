import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Empty from "./Empty.gif";
import swal from "sweetalert";
import { resetPasswordValidation } from "./validation"
import axios from "axios";

const ResetPassword = () => {
  const history = useHistory();

  const [data, setData] = useState({
    email: "",
    otp: "",
    password: "",
    conPassword: "",
  });

  

  const [error, setError] = useState({});

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setError(resetPasswordValidation(data));
    const { email, otp, password, conPassword } = data;

    if(email && otp && password && conPassword && password.length >= 8 && conPassword===password){ 
      await axios.post("https://vmart-api.herokuapp.com/forgotpass", {
        email: email,
        code: otp,
        password: password,
        con_password: conPassword,
      },
      {
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res)=>{
      if (res.status === 201) {
        swal({
          //title: "Success!",
          text: "Password reset successfuly",
          icon: "success",
          button: "Okay!",
        });
        history.push("/login");
      }
    }).catch ((error) => {
      if(error.response.status === 403){
        swal({
          //title: "Opps...!",
          text: "Invalid Email",
          icon: "warning",
          button: "Okay!",
        });
      }else if(error.response.status === 400){
        swal({
          //title: "Opps...!",
          text: "Invalid OTP or email",
          icon: "warning",
          button: "Okay!",
        });
      }else if(error.response.status === 401){
        swal({
          // title: "Opps...!",
          text: "OTP Expired",
          icon: "warning",
          button: "Okay!",
        });
        history.push("/email");
      }
    })
    }
  };

  return (
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src={Empty} className="img-fluid" alt="Sample" />
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4">
        <div>
          <label className="labels">Email ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="enter email id"
            name="email"
            value={data.email}
            onChange={handleInputs}
          />
          {error.email && (
            <span className="text-danger font-weight-bold">{error.email}</span>
          )}
        </div>
        <div>
          <label className="labels">OTP</label>
          <input
            type="text"
            className="form-control"
            placeholder="enter otp"
            name="otp"
            value={data.otp}
            onChange={handleInputs}
          />
          {error.otp && (
            <span className="text-danger font-weight-bold">{error.otp}</span>
          )}
        </div>
        <div>
          <label className="labels">New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="enter new password"
            name="password"
            value={data.password}
            onChange={handleInputs}
          />
          {error.password && (
            <span className="text-danger font-weight-bold">
              {error.password}
            </span>
          )}
        </div>
        <div>
          <label className="labels">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Retype password"
            name="conPassword"
            value={data.conPassword}
            onChange={handleInputs}
          />
          {error.conPassword && (
            <span className="text-danger font-weight-bold">
              {error.conPassword}
            </span>
          )}
        </div>
        <br></br>
        <button
          className="btn btn-danger profile-button"
          type="button"
          onClick={() => {
            history.go(-1);
          }}
        >
          Cancel
        </button>
        <NavLink to="/ResetPassword">
          <button
            className="btn btn-primary profile-button"
            type="button"
            onClick={resetPassword}
          >
            Change Password
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ResetPassword;
