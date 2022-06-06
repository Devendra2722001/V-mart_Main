import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Empty from "./Empty.gif";
import swal from "sweetalert";
import axios from "axios";
import { emailValidation } from "./validation";

const Email = () => {
  const history = useHistory();

  const [email, setEmail] = useState({
    emailID: "",
  });
 

  const [error, setError] = useState({});

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setEmail({ ...email, [name]: value });
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    setError(emailValidation(email));
    
    const { emailID } = email;
    if(emailID){
      await axios.post("http://localhost:8000/sendotp", { email: emailID}, {
      headers: {
        "Content-Type": "application/json",
      }
      }).then((res) => {
        console.log("responce of send email", res);
        if (res.status === 200) {
          swal({
            title: "",
            text: "OTP send on given email ID.",
            icon: "success",
            button: "Okay!",
          });
          history.push("/ResetPassword");
        } 
      }).catch((error) => {
        if (error.response.status === 400) {
          swal({
            title: "Opps...!",
            text: "No user with this Email ID!",
            icon: "warning",
            button: "Okay!",
          });
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
        <button
          className="btn btn-danger profile-button"
          type="button"
          onClick={()=>{history.go(-1)}}
        >
          Cancel
        </button>
        <NavLink to="/ResetPassword">
          <button
            className="btn btn-primary profile-button"
            type="button"
            onClick={sendOTP}
          >
            Send OTP
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Email;
