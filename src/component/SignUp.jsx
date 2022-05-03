import Empty from './Empty.gif';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import validation from './validation';


const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    fname: "", lname: "", email: "", password: "", cpassword: ""
  });

  const [error, setError] = useState({});

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }


  const PostData = async (e) => {
    e.preventDefault();
    setError(validation(user))
    const { fname, lname, email, password, cpassword } = user;
    let data = await fetch("https://vmart-api.herokuapp.com/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
              
      body: JSON.stringify({
        firstName:fname, lastName:lname, email:email, password:password, con_password:cpassword
      })
    });

    // data = await data.json();
    if(data.status === 400 || data.status === 401 || !data ){
      console.log("Registration not successful");
    }
    else  {
      swal({
        title: "Success!",
        text: "Now you are Registered!",
        icon: "success",
        button: "Okay!",
      });
      console.log("Successfull Registration");
      history.push("/login");
    }  
  }

  return (

    <section class="vh-100">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img src={Empty}
              class="img-fluid" alt="Sample image" />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4">
            <form method="POST">

              <div class="row mt-2 needs-validation">
                <div class="col-md-6">
                  <label class="labels">First name</label>
                  <input type="text" className="form-control" id="firstName" placeholder="Enter Firstname" required="" name="fname" value={user.fname} onChange={handleInputs}/>
                  {error.fname && <span className='text-danger font-weight-bold'>{error.fname}</span>}
                </div>
                <div class="col-md-6">
                  <label class="labels">Last name</label>
                  <input type="text" className="form-control" id="lastName" placeholder="Enter Last name" required="" name="lname" value={user.lname} onChange={handleInputs} />
                  {error.lname && <span className='text-danger font-weight-bold'>{error.lname}</span>}
                </div>
                <div class="col-md-12">
                  <label class="labels">Email ID</label>
                  <input type="text" class="form-control" placeholder="Enter email " name="email" value={user.email} onChange={handleInputs} />
                  {error.email && <span className='text-danger font-weight-bold'>{error.email}</span>}
                </div>
                <div class="col-md-12">
                  <label class="labels">Password</label>
                  <input type="password" class="form-control" placeholder="Enter password" name="password" value={user.password} onChange={handleInputs} />
                  {error.password && <span className='text-danger font-weight-bold'>{error.password}</span>}
                </div>
                <div class="col-md-12">
                  <label class="labels">Comfirm Password</label>
                  <input type="password" class="form-control" placeholder="Enter comfirm password" name="cpassword" value={user.cpassword} onChange={handleInputs} />
                  {error.cpassword && <span className='text-danger font-weight-bold'>{error.cpassword}</span>}
                </div>
                {/* <div class="col-md-12">
                  <label class="labels">Select Role</label><br></br>
                  <input type="radio" name="isAdmin" value={user.isAdmin == true} onChange={handleInputs}/> User &nbsp;
                  <input type="radio" name="isAdmin" value={user.isAdmin == false} onChange={handleInputs} /> Admin
                  {error.isAdmin && <span className='text-danger font-weight-bold'>{error.isAdmin}</span>}
                </div> */}
              </div>
              <div class="text-center text-lg-start pt-2 mt-3">
                <button type="submit" class="btn btn-primary btn-lg" id="login_btn-style" value="register" onClick={PostData}>Signup</button>
                <p class="small fw-bold mt-2 pt-1 mb-0">Already have an account?
                  <NavLink to="/login">Login</NavLink></p>
              </div>

            </form>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Signup;