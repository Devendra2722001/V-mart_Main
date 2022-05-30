import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const AddAddress = () => {
  const history = useHistory();
  const [address, setAddress] = useState({
    addline1: "",
    addline2: "",
    city: "",
    district: "",
    state: "",
    zipCode: "",
  });

  const [error, setError] = useState({});

  const validation = (address) => {
    let error = {};
    if (!address.addline1) {
      error.addline1 = "* Please enter address line-1.";
    }
    if (!address.addline2) {
      error.addline2 = "* Please enter address line-2.";
    }
    if (!address.city) {
      error.city = "* Please enter city.";
    }
    if (!address.district) {
      error.district = "* Please enter district.";
    }
    if (!address.state) {
      error.state = "* Please enter state.";
    }
    if (!address.zipCode) {
      error.zipCode = "* Please enter zipCode.";
    }
    return error;
  };

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setAddress({ ...address, [name]: value });
  };

  // const formData = new FormData();
  const addproduct = async (e) => {
    //e.preventDefault();
    //const { addline1, addline2, city, district, state, zipCode } = address;

    // formData.append("addressLine1", address.addline1);
    // formData.append("addressLine2", address.addline2);
    // formData.append("cityName", address.city);
    // formData.append("district", address.district);
    // formData.append("state", address.state);
    // formData.append("zipCode", address.zipCode);

  }

  // console.log("formData",formData);

  const PostData = async (e) => {
    e.preventDefault();
    setError(validation(address));    
    const token=JSON.parse(localStorage.getItem("token"))
    console.log("token",token);
    await axios.post("https://vmart-api.herokuapp.com/addAddress",{
        addressLine1: address.addline1,
        addressLine2: address.addline2,
        cityName: address.city,
        district: address.district,
        state: address.state,
        zipCode: address.zipCode,
    },{
      headers: {
        'Content-Type': 'application/json',
        token:token
      },      
  }).then((res)=>{    
    if (res.status === 201) {
      CongoAlert();
    }
    console.log(res);
  
  }).catch((e)=>{console.log(e);})

}

  const CongoAlert = () => {
    swal({
      title: "Added!",
      text: "Address added Successfull....",
      icon: "success",
      button: "Okay!",
    });
    history.go(-1);
  };

  return (
    <>
      <div className="checkout-main">
        <div className="container">
          <div className="row g-5">
            <div className="p-3 mt-3">
              <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <h6 className="order_text mt-3 mb-3">
                  <b>Enter Details </b>
                </h6>
              </div>
              <form method="post" className="needs-validation" novalidate="">
                <div className="row g-3" id="user-profile-card">
                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      AddressLine - 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="House or building Name"
                      required=""
                      name="addline1"
                      value={address.addline1}
                      onChange={handleInputs}
                    />
                    {error.addline1 && (
                      <span className="text-danger font-weight-bold">
                        {error.addline1}
                      </span>
                    )}
                    <div className="invalid-feedback">
                      Please enter AddressLine - 1.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="line2" className="form-label">
                      Location
                    </label>
                    <select
                      type="option"
                      className="form-control"
                      id="line2"
                      placeholder="Street or Road Name"
                      autoComplete="off"
                      required=""
                      name="addline2"
                      value={address.addline2}
                      onChange={handleInputs}
                    >
                      <option>Home</option>
                      <option>Office</option>
                    </select>
                    {/* {error.addline2 && <span className='text-danger font-weight-bold'>{error.addline2}</span>} */}
                    <div className="invalid-feedback">
                      Please Select Location.
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="firstName" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="City, Town or Village name"
                      required=""
                      name="city"
                      value={address.city}
                      onChange={handleInputs}
                    />
                    {error.city && (
                      <span className="text-danger font-weight-bold">
                        {error.city}
                      </span>
                    )}
                    <div className="invalid-feedback">
                      Valid City is required.
                    </div>
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="firstName" className="form-label">
                      District
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="district"
                      placeholder="District name"
                      required=""
                      name="district"
                      value={address.district}
                      onChange={handleInputs}
                    />
                    {error.district && (
                      <span className="text-danger font-weight-bold">
                        {error.district}
                      </span>
                    )}
                    <div className="invalid-feedback">
                      Valid District is required.
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="firstName" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="State Name"
                      required=""
                      name="state"
                      value={address.state}
                      onChange={handleInputs}
                    />
                    {error.state && (
                      <span className="text-danger font-weight-bold">
                        {error.state}
                      </span>
                    )}
                    <div className="invalid-feedback">
                      Valid State is required.
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="firstName" className="form-label">
                      ZipCode
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipCode"
                      placeholder="zipCode"
                      required=""
                      name="zipCode"
                      value={address.zipCode}
                      onChange={handleInputs}
                    />
                    {error.zipCode && (
                      <span className="text-danger font-weight-bold">
                        {error.zipCode}
                      </span>
                    )}
                    <div className="invalid-feedback">
                      Valid ZipCode is required.
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <button
                  className="btn btn-success profile-button"
                  type="button"
                  onClick={PostData}
                >
                  Add Address
                </button>{" "}
                &nbsp;
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
