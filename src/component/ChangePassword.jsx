import Empty from "./Empty.gif";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import {changPasswordValidation} from "./validation";

const ChangePassword = () => {
  const history = useHistory();
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    ProtectedRoute();
    console.log("Plese Login First");
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    if (token == null) {
      CongoAlert();
    }
  };

  const CongoAlert = () => {
    swal({
      title: "Login/Signup!",
      text: "Please Login/Singup first to view your profile",
      icon: "warning",
      button: "Okay!",
    });
    history.push("/login");
  };

  const CongoAlertDone = () => {
    swal({
      title: "Changed !",
      text: "Password Changed Successfully....",
      icon: "success",
      button: "Okay!",
    });
    history.push("/user");
  };

  console.log(typeof error);
  console.log("error", error);


  const ChangePass = async (e) => {
    //e.preventDefault();    
    setError(changPasswordValidation(data))
    const { oldPassword, newPassword, confirmPassword } = data;
    if(oldPassword && newPassword === confirmPassword && newPassword.length >=8 ){

      await axios.post("https://vmart-api.herokuapp.com/changePassword",{ 
      oldPassword: oldPassword,
      password: newPassword,
      con_password: confirmPassword,},
     {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
        "Content-Type": "application/json",
      }
    }).then((res) =>{
      console.log("responce of change password",res);
      if (res.status === 200) {
        CongoAlertDone();
      }
      // else{
        
      // }
    }).catch((error) => {
      if(error.response.status === 400){
        swal({
          title: "Error!",
          text: " Old password not metch! ",
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
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Old Password</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter old password"
                    name="oldPassword"
                    value={data.oldPassword}
                    onChange={handleInputs}
                  />
                </div>
                {error.oldPassword && (
                  <span className="text-danger font-weight-bold">
                    {error.oldPassword}
                  </span>
                )}
                <div className="col-md-12">
                  <label className="labels">New Password</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter new password"
                    name="newPassword"
                    value={data.newPassword}
                    onChange={handleInputs}
                  />
                </div>
                {error.newPassword && (
                  <span className="text-danger font-weight-bold">
                    {error.newPassword}
                  </span>
                )}
                <div className="col-md-12">
                  <label className="labels">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="re-enter new password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleInputs}
                  />
                </div>
                {error.confirmPassword && (
                  <span className="text-danger font-weight-bold">
                    {error.confirmPassword}
                  </span>
                )}
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  id="login_btn-style"
                  onClick={() => {
                    history.go(-1);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  id="login_btn-style"
                  onClick={ChangePass}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
