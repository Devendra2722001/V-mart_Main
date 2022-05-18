import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const EditProfile = () => {
  const [, setProfile] = useState("");
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    let result = await fetch(`https://vmart-api.herokuapp.com/myProfile`, {
      method: "get",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setProfile(result);
    setFirstName(result.firstName);
    setLastName(result.lastName);
  };

  console.log(firstName);
  console.log(lastName);

  let profile = {
    firstName,
    lastName,
  };

  const PostData = async (e) => {
    e.preventDefault();

    //const items = { firstName, lastName };

    if (profile) {
      let res = await fetch(`https://vmart-api.herokuapp.com/updateProfile`, {
        method: "put",
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      });
      if (res.status === 201) {
        CongoAlert();
      }
    } else {
      console.log("Err");
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
                      firstName
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      required
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      firstName
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      required
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <br></br>
                <button
                  class="btn btn-success profile-button"
                  type="button"
                  onClick={PostData}
                >
                  save changes
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
