import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Empty from "./Empty.gif";

const ResetPassword = () => {
  const history = useHistory();

  const [data, setData] = useState({
    email: "",
    otp: "",
    password: "",
    conPassword: "",
  });

  let validation = (data) => {
    let error = {};
    if (!data.email) {
      error.email = "* Email must required.";
    }
    if (!data.otp) {
      error.otp = "* otp must required.";
    }
    if (!data.password) {
      error.password = "* password must required.";
    } else if (data.password.length < 8) {
      error.password = "* Minimum length of password is 8 charecter.";
    }
    if (!data.conPassword) {
      error.conPassword = "* confirm password must required.";
    } else if (data.password !== data.conPassword) {
      error.conPassword = "* Password and Confirm password not match.";
    }
    return error;
  };

  const [error, setError] = useState({});

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    setError(validation(data));
    const { email, otp, password, conPassword } = data;
    const res = await fetch("https://vmart-api.herokuapp.com/forgotpass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        code: otp,
        password: password,
        con_password: conPassword,
      }),
    });
    if (res.status === 200) {
      window.alert("-- Password reset successfuly --");
      history.push("/login");
    }
    // else if(res.status === 400){
    //   window.alert("-- Password not reset --");
    // }
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
