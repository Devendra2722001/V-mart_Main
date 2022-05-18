import React, { useState, useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";

const EditAddress = () => {
  const history = useHistory();
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    cityName: "",
    district: "",
    state: "",
    zipCode: "",
  });
  const params = useParams();
  const [error, setError] = useState({});

  const validation = (address) => {
    let error = {};
    if (!address.addressLine1) {
      error.addline1 = "* Please enter address line-1.";
    }
    if (!address.addressLine2) {
      error.addline2 = "* Please enter address line-2.";
    }
    if (!address.cityName) {
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
    } else if (address.zipCode.length > 6) {
      error.zipCode = "* maxinum six digits allowed.";
    } else if (address.zipCode.length < 6) {
      error.zipCode = "* minimum six digits allowed.";
    }
    if (isNaN(address.zipCode)) {
      error.zipCode = "* ZipCode contain only digits.";
    }
    // else if(address.addressLine1 && address.addressLine2 && address.cityName && address.district && address.state && address.zipCode && address.zipCode.length === 6) {
    //     window.alert(" address Updated");
    //     history.push("/user");
    // }
    return error;
  };

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    console.log(params);

    let result = await fetch(`/selectedAddress/${params.id}`, {
      method: "get",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    console.log(result);
    setAddress(result);
  };
  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setAddress({ ...address, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    setError(validation(address));
    const { addressLine1, addressLine2, cityName, district, state, zipCode } =
      address;
    if (
      addressLine1 &&
      addressLine2 &&
      cityName &&
      district &&
      state &&
      zipCode
    ) {
      let res = await fetch(`/updateAddress/${params.id}`, {
        method: "put",
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          cityName: cityName,
          district: district,
          state: state,
          zipCode: zipCode,
        }),
      });

      //res = await res.json();
      console.log(res);
      if (res.status === 201) {
        if (
          address.addressLine1 &&
          address.addressLine2 &&
          address.cityName &&
          address.district &&
          address.state &&
          address.zipCode &&
          address.zipCode.length === 6 &&
          !isNaN(address.zipCode)
        ) {
          window.alert(" address Updated");
          history.push("/user");
        }
      } else {
        window.alert("-- Something went wrong --");
      }
    }
  };

  return (
    <>
      <div className="checkout-main">
        <div className="container my-5">
          <div className="row g-5">
            <div className="">
              <h4 className="mb-3">update Address</h4>
              <form
                method="post"
                className="needs-validation"
                novalidate=""
                onSubmit={PostData}
              >
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      AddressLine - 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="5678 Main St"
                      required
                      name="addressLine1"
                      value={address.addressLine1}
                      onChange={handleInputs}
                    />
                    {error.addline1 && (
                      <span className="text-danger font-weight-bold">
                        {error.addline1}
                      </span>
                    )}
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  {/* <div className="col-12">
                                    <label htmlFor="address" className="form-label">AddressLine - 2</label>
                                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" required="" name="addressLine2" value={address.addressLine2} onChange={handleInputs}/>
                                    {error.addline2 && <span className='text-danger font-weight-bold'>{error.addline2}</span>}
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div> */}

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Location
                    </label>
                    <select
                      type="option"
                      className="form-control"
                      id="address"
                      required=""
                      name="addressLine2"
                      value={address.addressLine2}
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
                      cityName
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cityName"
                      placeholder="cityName"
                      required=""
                      name="cityName"
                      value={address.cityName}
                      onChange={handleInputs}
                    />
                    {error.city && (
                      <span className="text-danger font-weight-bold">
                        {error.city}
                      </span>
                    )}
                    <div className="invalid-feedback">
                      Valid cityName is required.
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="firstName" className="form-label">
                      District
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="district"
                      placeholder="district"
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
                      Valid cityName is required.
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
                      placeholder="state"
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
                      Valid cityName is required.
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
                      Valid cityName is required.
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <button
                  className="btn btn-success profile-button"
                  type="button"
                  onClick={PostData}
                >
                  save changes
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

export default EditAddress;
