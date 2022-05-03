import Empty from './Empty.gif';
import React,{useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const Login = () => {


  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email:"", password: "",
  })
 
  const [error, setError] = useState({});

  const validation = (credentials) =>{
    let error={};
    if (!credentials.email){
        error.email = "* email must required."
    }
    if (!credentials.password){
      error.password = "* password must required."
    }
    return error;
  }

  let name, value;
      const handleInputs = (e) => {
      name = e.target.name;
      value = e.target.value;
      setCredentials({ ...credentials, [name]: value });
  }

  const CongoAlert = () => {
    swal({
        title: "Welcome!",
        text: "Login Successfull....",
        icon: "success",
        button: "Okay!",
      });
      history.push("/");
}


  const LoginUser = async (e) => {
    e.preventDefault();
    //window.location.reload();

    

    setError(validation(credentials))
    const{email, password} = credentials
    const res = await fetch("https://vmart-api.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
              
      body: JSON.stringify({
        email:email, password:password
      })
    });


    const data = await res.json();
    console.log(data);
      if(data.user.isAdmin === true){
        localStorage.setItem("token" , JSON.stringify(data.token));
        localStorage.setItem("ImAdmin" , true);
        console.log("Admin Login Successfull");
        //window.location.href = "http://localhost:3000/";
        localStorage.removeItem('token');  
        history.push("/");
        window.location.reload();     
      }else

      {
      if (data.status = data) {
        localStorage.setItem("token" , JSON.stringify(data.token));
        //window.alert("Login Successfull....");
        CongoAlert();
        console.log("User Login Successfull");
        history.push("/");
               
      } else { 
        window.alert("-- Invalid Credentials --"); 
      }
    }}


       


    return (
        
        <section class="vh-100">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img src={Empty}
                class="img-fluid" alt="Sample"/>
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4">

              <form  method="POST">
                    
              <div class="row mt-3">
                                
                <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" placeholder="enter email id" name="email" value={credentials.email} onChange={handleInputs}/></div>
                {error.email && <span className='text-danger font-weight-bold'>{error.email}</span>}
                <div class="col-md-12 "><label class="labels">Password</label><input type="password" class="form-control" placeholder="enter password" name="password" value={credentials.password} onChange={handleInputs} /></div>
                {error.password && <span className='text-danger font-weight-bold'>{error.password}</span>}
                                
              </div>
      
                <div class="d-flex justify-content-between align-items-center">
                  <NavLink to="/email" class="text-body">Forgot password?</NavLink>
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button type="button" class="btn btn-primary btn-lg"
                    id="login_btn-style" onClick={LoginUser}>Login</button>
                  <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
                  <NavLink to="/signup">Register</NavLink></p>
                </div>
      
              </form>
            </div>
          </div>
        </div>
        
      </section>
    )
}

export default Login;