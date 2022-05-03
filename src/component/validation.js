let validation = (user,email) => {

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

export default validation