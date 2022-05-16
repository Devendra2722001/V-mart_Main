import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import swal from "sweetalert";
import Skeleton from "react-loading-skeleton";
import No_data from "./No_data.gif";

const User = () => {
  const history = useHistory();
  const [profile, setProfile] = useState([]);
  const [address, setAddress] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
    getAddress();
    getOrderHistory();
    ProtectedRoute();
  }, []);

  const getProfile = async () => {
    let result = await fetch("http://localhost:8000/myProfile", {
      method: "GET",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setProfile(result);
    setLoading(false);

    if (result.status === !result) {
      window.alert("Login Or Signup");
      console.log("Successfull Registration");
      history.push("/login");
    } else {
      //window.alert("Welcome");
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    CongoAlertLogout();
  };

  const ProtectedRoute = (props) => {
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

  const CongoAlertLogout = () => {
    swal({
      title: "Cya Later!",
      text: "Logout Successfull....",
      icon: "success",
      button: "Okay!",
    });
    history.push("/login");
  };

  const getAddress = async () => {
    let result = await fetch("http://localhost:8000/addressListing", {
      method: "GET",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setAddress(result);
  };

  const removeAddress = async (id) => {
    let result = await fetch(`http://localhost:8000/removeAddress/${id}`, {
      method: "post",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setAddress(result);
  };

  const getOrderHistory = async () => {
    let result = await fetch("http://localhost:8000/myOrder", {
      method: "GET",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setOrderHistory(result);
    console.log("result", result);
  };

  const Loading = () => {
    return (
      <>
        <div class="user_loading">
          <Skeleton height={600} width={350} />

          <div>
            <Skeleton height={250} width={500} />
          </div>
          <div class="marginleft">
            <Skeleton height={100} width={300} />
          </div>
        </div>
      </>
    );
  };

  const NoAddressAndNoorderFound = () => {
    console.log("Showing Profile with no address & no order");
    return (
      <section className="margin_bottom-for-user">
        <div class="container rounded bg-white mt-4">
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column mt-5">
                <div class="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Profile</b>
                  </h6>
                </div>
                <div class="d-flex flex-column" id="user-profile-card">
                  <div class="d-flex flex-column align-items-center">
                    <img
                      class="rounded-circle "
                      width="100px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      alt="User Profile"
                    />
                    <div class="d-flex flex-row" id="margin_user">
                      <div class="font-weight-bold">
                        <b>
                          {profile.firstName} {profile.lastName}
                        </b>
                      </div>
                      &nbsp;
                    </div>
                  </div>
                  <hr></hr>
                  <div class="text-left p-2">
                    <div class="col-md-12">
                      <label htmlFor="firstName">
                        <b>First Name :</b> {profile.firstName}
                      </label>
                    </div>
                    <div class="col-md-12">
                      <label htmlFor="lastName">
                        <b>Last Name :</b> {profile.lastName}
                      </label>
                    </div>
                    <div class="col-md-12">
                      <label htmlFor="Email_id">
                        <b>Email ID :</b> {profile.email}
                      </label>
                    </div>
                    {/* <div class="col-md-12">
                                        <label htmlFor="Email_id"><b>Mobile No :</b> {profile.mobile}</label>
                                    </div> */}
                    <br></br>
                    <div class="d-flex flex-column align-items-center">
                      <NavLink to="/ChangePassword">
                        <button
                          class="btn btn-primary profile-button"
                          type="button"
                        >
                          Change Password
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div class="mt-5">
                  <button
                    class="btn btn-primary profile-button"
                    type="button"
                    onClick={() => logout()}
                  >
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-5 border-right">
              <div class="p-3 mt-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="order_text">
                    <b>My Addresses</b>
                  </h6>
                  <div>
                    <NavLink to="/AddAddress">
                      <button
                        class="btn btn-primary profile-button"
                        type="button"
                      >
                        Add New Address
                      </button>
                    </NavLink>
                  </div>
                </div>
                <div
                  class="row mt-2 p-3 list-group mb-3"
                  id="user-profile-card"
                >
                  <div className="NodataAdd">
                    <img
                      src={No_data}
                      className="No_data-img"
                      alt="No_data-Img"
                    />

                    <span>You Don't Have Any Address Saved</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="py-5">
                <div class="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Orders</b>
                  </h6>
                </div>

                <div className="order_His-card">
                  <div className="Nodataorder">
                    <img
                      src={No_data}
                      className="No_data-img_order"
                      alt="No_data-Img"
                    />

                    <span>You Havent ordered Anything yet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const NoOrderFound = () => {
    console.log("Showing Profile with no order");
    return (
      <section className="margin_bottom-for-user">
        <div class="container rounded bg-white mt-4">
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column mt-5">
                <div class="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Profile</b>
                  </h6>
                </div>
                <div class="d-flex flex-column" id="user-profile-card">
                  <div class="d-flex flex-column align-items-center">
                    <img
                      class="rounded-circle "
                      width="100px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      alt="User Profile"
                    />
                    <div class="d-flex flex-row" id="margin_user">
                      <div class="font-weight-bold">
                        <b>
                          {profile.firstName} {profile.lastName}
                        </b>
                      </div>
                      &nbsp;
                    </div>
                  </div>
                  <hr></hr>
                  <div class="text-left p-2">
                    <div class="col-md-12">
                      <label htmlFor="firstName">
                        <b>First Name :</b> {profile.firstName}
                      </label>
                    </div>
                    <div class="col-md-12">
                      <label htmlFor="lastName">
                        <b>Last Name :</b> {profile.lastName}
                      </label>
                    </div>
                    <div class="col-md-12">
                      <label htmlFor="Email_id">
                        <b>Email ID :</b> {profile.email}
                      </label>
                    </div>
                    {/* <div class="col-md-12">
                                        <label htmlFor="Email_id"><b>Mobile No :</b> {profile.mobile}</label>
                                    </div> */}
                    <br></br>
                    <div class="d-flex flex-column align-items-center">
                      <NavLink to="/ChangePassword">
                        <button
                          class="btn btn-primary profile-button"
                          type="button"
                        >
                          Change Password
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div class="mt-5">
                  <button
                    class="btn btn-primary profile-button"
                    type="button"
                    onClick={() => logout()}
                  >
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-5 border-right">
              <div class="p-3 mt-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="order_text">
                    <b>My Addresses</b>
                  </h6>
                  <div>
                    <NavLink to="/AddAddress">
                      <button
                        class="btn btn-primary profile-button"
                        type="button"
                      >
                        Add New Address
                      </button>
                    </NavLink>
                  </div>
                </div>
                {address.map((addressObj) => (
                  <div
                    class="row mt-2 p-3 list-group mb-3"
                    id="user-profile-card"
                    key={addressObj._id}
                  >
                    <div className="col-md-12 row mb-2">
                      <div class="col-md-12">
                        <label htmlFor="lastName" className="form-label">
                          {addressObj.addressLine1}
                        </label>
                      </div>
                      <div class="col-md-12">
                        <label htmlFor="lastName" className="form-label">
                          {addressObj.addressLine2}
                        </label>
                      </div>
                      <div class="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          Town/City : {addressObj.cityName}
                        </label>
                      </div>
                      <div class="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          District : {addressObj.district}
                        </label>
                      </div>
                      <div class="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          State : {addressObj.state}
                        </label>
                      </div>
                      <div class="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          Zip Code : {addressObj.zipCode}
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div class="text-center">
                      <NavLink to={`/EditAddress/${addressObj._id}`}>
                        <button
                          class="btn btn-primary profile-button"
                          type="button"
                          id="user_address"
                        >
                          {" "}
                          Edit Address{" "}
                        </button>
                      </NavLink>{" "}
                      &nbsp;
                      <button
                        class="btn btn-danger profile-button"
                        type="button"
                        id="user_address_remove"
                        onClick={() => removeAddress(addressObj._id)}
                      >
                        Remove Address
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div class="col-md-4">
              <div class="py-5">
                <div class="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Orders</b>
                  </h6>
                </div>

                <div className="order_His-card">
                  <div className="Nodataorder">
                    <img
                      src={No_data}
                      className="No_data-img_order"
                      alt="No_data-Img"
                    />

                    <span>You Havent ordered Anything yet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const NoAddressFound = () => {
    console.log("Showing Profile with no address");
    return (
      <section className="margin_bottom-for-user">
        <div class="container rounded bg-white mt-4">
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column mt-5">
                <div class="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Profile</b>
                  </h6>
                </div>
                <div class="d-flex flex-column" id="user-profile-card">
                  <div class="d-flex flex-column align-items-center">
                    <img
                      class="rounded-circle "
                      width="100px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      alt="User Profile"
                    />
                    <div class="d-flex flex-row" id="margin_user">
                      <div class="font-weight-bold">
                        <b>
                          {profile.firstName} {profile.lastName}
                        </b>
                      </div>
                      &nbsp;
                    </div>
                  </div>
                  <hr></hr>
                  <div class="text-left p-2">
                    <div class="col-md-12">
                      <label htmlFor="firstName">
                        <b>First Name :</b> {profile.firstName}
                      </label>
                    </div>
                    <div class="col-md-12">
                      <label htmlFor="lastName">
                        <b>Last Name :</b> {profile.lastName}
                      </label>
                    </div>
                    <div class="col-md-12">
                      <label htmlFor="Email_id">
                        <b>Email ID :</b> {profile.email}
                      </label>
                    </div>
                    {/* <div class="col-md-12">
                                        <label htmlFor="Email_id"><b>Mobile No :</b> {profile.mobile}</label>
                                    </div> */}
                    <br></br>
                    <div class="d-flex flex-column align-items-center">
                      <NavLink to="/ChangePassword">
                        <button
                          class="btn btn-primary profile-button"
                          type="button"
                        >
                          Change Password
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div class="mt-5">
                  <button
                    class="btn btn-primary profile-button"
                    type="button"
                    onClick={() => logout()}
                  >
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-5 border-right">
              <div class="p-3 mt-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="order_text">
                    <b>My Addresses</b>
                  </h6>
                  <div>
                    <NavLink to="/AddAddress">
                      <button
                        class="btn btn-primary profile-button"
                        type="button"
                      >
                        Add New Address
                      </button>
                    </NavLink>
                  </div>
                </div>
                <div
                  class="row mt-2 p-3 list-group mb-3"
                  id="user-profile-card"
                >
                  <div className="NodataAdd">
                    <img
                      src={No_data}
                      className="No_data-img"
                      alt="No_data-Img"
                    />

                    <span>You Don't Have Any Address Saved</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="py-5">
                <div class="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Orders</b>
                  </h6>
                </div>
                {orderHistory.map((orderHistory) => {
                  return orderHistory.products.reverse().map((products) => {
                    return (
                      <ul className="list-group" key={orderHistory._id}>
                        <li className="d-flex justify-content-between mb-3">
                          <div className="user-card">
                            <img
                              src={products.productImageurl}
                              onError={(event) => {
                                event.target.src =
                                  "https://res.cloudinary.com/volansys/image/upload/v1650948247/images/1000_F_441129176_ifK3aSVPLlSM4kDe93SlaEACpBNZQOtg_zu4bdb.jpg";
                                event.onerror = null;
                              }}
                              alt="images"
                              className="user-card-media"
                            />
                            <div className="cart-card-text">
                              <div className="order_text">
                                {products?.productName}
                              </div>
                              <div className="user-card-price">
                                Price : {products?.productPrice}/-
                              </div>
                              {/* <div class="cart-lastrow">
                                                    <div className="user-card-category">payment method : {orderHistory?.paymentMethod}</div>
                                                </div> */}
                            </div>
                          </div>
                        </li>
                      </ul>
                    );
                  });
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const ShowProfile = () => {
    console.log("Showing full Profile");
    return (
      <section className="margin_bottom-for-user">
        <div class="container rounded bg-white mt-4">
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column mt-5">
                <div class="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Profile</b>
                  </h6>
                </div>
                <div class="d-flex flex-column" id="user-profile-card">
                  <div class="d-flex flex-column align-items-center">
                    <img
                      class="rounded-circle "
                      width="100px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      alt="User Profile"
                    />
                    <div class="d-flex flex-row" id="margin_user">
                      <div class="font-weight-bold">
                        <b>
                          {profile.firstName} {profile.lastName}
                        </b>
                      </div>
                      &nbsp;
                    </div>
                  </div>
                  <hr></hr>
                  <div class="text-left p-2">
                    <div class="col-md-12">
                      <label htmlFor="firstName">
                        <b>First Name :</b> {profile.firstName}
                      </label>
                    </div>
                    <div class="col-md-12">
                      <label htmlFor="lastName">
                        <b>Last Name :</b> {profile.lastName}
                      </label>
                    </div>
                    <div class="col-md-12">
                      <label htmlFor="Email_id">
                        <b>Email ID :</b> {profile.email}
                      </label>
                    </div>
                    {/* <div class="col-md-12">
                                        <label htmlFor="Email_id"><b>Mobile No :</b> {profile.mobile}</label>
                                    </div> */}
                    <br></br>
                    <div class="d-flex flex-column align-items-center">
                      <NavLink to="/ChangePassword">
                        <button
                          class="btn btn-primary profile-button"
                          type="button"
                        >
                          Change Password
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div class="mt-5">
                  <button
                    class="btn btn-primary profile-button"
                    type="button"
                    onClick={() => logout()}
                  >
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-5 border-right">
              <div class="p-3 mt-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="order_text">
                    <b>My Addresses</b>
                  </h6>
                  <div>
                    <NavLink to="/AddAddress">
                      <button
                        class="btn btn-primary profile-button"
                        type="button"
                      >
                        Add New Address
                      </button>
                    </NavLink>
                  </div>
                </div>
                {address.map((addressObj) => (
                  <div
                    class="row mt-2 p-3 list-group mb-3"
                    id="user-profile-card"
                    key={addressObj._id}
                  >
                    <div className="col-md-12 row mb-2">
                      <div class="col-md-12">
                        <label htmlFor="lastName" className="form-label">
                          {addressObj.addressLine1}
                        </label>
                      </div>
                      <div class="col-md-12">
                        <label htmlFor="lastName" className="form-label">
                          {addressObj.addressLine2}
                        </label>
                      </div>
                      <div class="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          Town/City : {addressObj.cityName}
                        </label>
                      </div>
                      <div class="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          District : {addressObj.district}
                        </label>
                      </div>
                      <div class="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          State : {addressObj.state}
                        </label>
                      </div>
                      <div class="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          Zip Code : {addressObj.zipCode}
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div class="text-center">
                      <NavLink to={`/EditAddress/${addressObj._id}`}>
                        <button
                          class="btn profile-button"
                          type="button"
                          id="user_address"
                        >
                          {" "}
                          Edit Address{" "}
                        </button>
                      </NavLink>{" "}
                      &nbsp;
                      <button
                        class="btn profile-button"
                        type="button"
                        id="user_address_remove"
                        onClick={() => removeAddress(addressObj._id)}
                      >
                        Remove Address
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div class="col-md-4">
              <div class="py-5">
                <div class="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Orders</b>
                  </h6>
                </div>
                {orderHistory.map((orderHistory) => {
                  return orderHistory.products.reverse().map((products) => {
                    return (
                      <ul className="list-group" key={orderHistory._id}>
                        <li className="d-flex justify-content-between mb-3">
                          <div className="user-card">
                            <img
                              src={products.productImageurl}
                              onError={(event) => {
                                event.target.src =
                                  "https://res.cloudinary.com/volansys/image/upload/v1650948247/images/1000_F_441129176_ifK3aSVPLlSM4kDe93SlaEACpBNZQOtg_zu4bdb.jpg";
                                event.onerror = null;
                              }}
                              alt="images"
                              className="user-card-media"
                            />
                            <div className="cart-card-text">
                              <div className="order_text">
                                {products?.productName}
                              </div>
                              <div className="user-card-price">
                                Price : {products?.productPrice}/-
                              </div>
                              {/* <div class="cart-lastrow">
                                                    <div className="user-card-category">payment method : {orderHistory?.paymentMethod}</div>
                                                </div> */}
                            </div>
                          </div>
                        </li>
                      </ul>
                    );
                  });
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  if (loading === true) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else if (address.length === 0 && orderHistory.length === 0) {
    return (
      <div>
        <NoAddressAndNoorderFound />
      </div>
    );
  } else if (address.length !== 0 && orderHistory.length === 0) {
    return (
      <div>
        <NoOrderFound />
      </div>
    );
  } else if (address.length === 0 && orderHistory.length !== 0) {
    return (
      <div>
        <NoAddressFound />
      </div>
    );
  } else {
    return (
      <div>
        <ShowProfile />
      </div>
    );
  }
};

export default User;
