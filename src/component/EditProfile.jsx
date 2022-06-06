import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const [, setProfile] = useState("");
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [profilePicture, setprofilePicture] = useState("");
  const [lastName, setLastName] = useState("");
  let [image, setImage] = useState([]); 
  let [imageUrl, setImageurl] = useState(""); 

  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile();
  }, []);

  const getProfile = async () => {
    await axios.get(`http://localhost:8000/myProfile`, {
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    }).then((res) =>{
      console.log("my profile for prefill form", res);
      setProfile(res.data);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setprofilePicture(res.data.profilePicture);
    })  
  };

  let profile = {
    firstName,
    lastName,
    profilePicture,
  };

  const postDP = () =>{
    const imgdata = new FormData();
    imgdata.append("file", image);
    imgdata.append("upload_preset", "V-mart_images");
    imgdata.append("cloud_name", "Volansys");

    fetch("https://api.cloudinary.com/v1_1/Volansys/image/upload", {
      method: "post",
      body: imgdata,
    })
      .then((res) => res.json())
      .then((imgdata) => {
        console.log(imgdata);
        setImageurl(imgdata.url)     
        postData(imgdata.url);
      })

      .catch((err) => {
        console.log(err);
      });
  } 

  console.log(imageUrl)
  

  const postData = async (img) => {
   
     console.log("Posting With This Url -",imageUrl);

     if (profile) {
      await axios.put(`http://localhost:8000/updateProfile`, {
        firstName: firstName,
        lastName: lastName,
        profilePicture : img,
      }, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
          "Content-Type": "application/json",
        },
      }).then((res) =>{
        console.log(res);
        if (res.status === 201) {
          CongoAlert();
        }else {
          console.log("Err");
        }
      })
      
    } 
    
  };

  const CongoAlert = () => {
    swal({
      title: "Updated!",
      text: "Profile Updated Successfull....",
      icon: "success",
      button: "Okay!",
    });
    history.push("/user");
  };
  

  return (
    <>
      <div className="checkout-main">
        <div className="container my-5">
          <div className="row g-5">
            <div className="">
              <h4 className="mb-3">Update Profile</h4>
              <form method="post" className="needs-validation" novalidate="">
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      required
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      required
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      required
                      name="image"                      
                      onChange={(e) => {setImage(e.target.files[0]);}}
                    />
                  </div>
                </div>
                <br></br>
                <button                  
                  className="btn btn-success profile-button"
                  type="button"   
                  onClick={()=>{history.go(-1)}}
                >
                  Cancel
                </button>
                <button
                id="Click_Me_to_Reupload"
                  class="btn btn-success profile-button"
                  type="button"
                  onClick={postDP}
                >
                  Save Changes
                </button>
                &nbsp;
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
