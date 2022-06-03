import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import {addAddressValidation} from "./validation";

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

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setAddress({ ...address, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    setError(addAddressValidation(address));
    const { addline1, addline2, city, district, state, zipCode } = address;
    if(addline1 && addline2 && city && district && state && zipCode && address.zipCode.length === 6 && !(isNaN(address.zipCode))){
      await axios.post("https://vmart-api.herokuapp.com/addAddress", {
        addressLine1: addline1,
        addressLine2: addline2,
        cityName: city,
        district: district,
        state: state,
        zipCode: zipCode,
    },
    {headers: {
        "Content-Type": "application/json",
        token: JSON.parse(localStorage.getItem("token")),
        
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 201) {
        CongoAlert();
      }
    })
    }
  };

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
                      AddressLine
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
                      Type
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
                      <option>--Select Type--</option>
                      <option>Home</option>
                      <option>Office</option>
                    </select>
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
                  className="btn btn-danger profile-button"
                  type="button"
                  onClick={() => {
                    history.push("/user");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success profile-button"
                  type="button"
                  onClick={postData}
                >
                  Add Address
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

export default AddAddress;
