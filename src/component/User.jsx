import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import swal from "sweetalert";
import Skeleton from "react-loading-skeleton";
import No_data from "./No_data.gif";
import "./testing_css.css";
let Edit = ("https://cdn-icons.flaticon.com/png/512/420/premium/420140.png?token=exp=1653375849~hmac=19309216d12ee5e780dbde75613f5107");
let Tick = ("https://cdn-icons.flaticon.com/png/512/1634/premium/1634264.png?token=exp=1653394803~hmac=db2f1af71843504a92209b6fab75611b");


const User = () => {
  const history = useHistory();
  const [profile, setProfile] = useState([]);
  const [CardState, setCardState] = useState("user-card");  
  const [address, setAddress] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [ImgTickEdit, setImgTickEdit] = useState(Edit);

  var token = localStorage.getItem("token");


  console.log("image",image);

  

    const DoImgTickEdit = () => {


      Noneed()
     
      // if (ImgTickEdit===Edit) {
      //   setImgTickEdit(Tick)
      // } 
    };

    console.log("Condtion",image==="");

    const Noneed = () =>{
      if((image==="")===false){
        setImgTickEdit(Tick)
      }else {        
        setImgTickEdit(Edit)
      }
    }

    

  useEffect(() => {
    getProfile();
    getAddress();
    getOrderHistory(); 
    setImgTickEdit(Edit);
  }, []);

 

  const ClickedtheCard = () => {
    if(CardState==="user-card_Big"){
      setCardState("user-card")
    }else{
      setCardState("user-card_Big")
    }
  }

  //console.log("orderHistory",orderHistory);

  

  
  const getProfile = async () => {
    if(token){
    let result = await fetch("http://localhost:8000/myProfile", {
      method: "GET",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setProfile(result);
    setLoading(false);
    }
    else{
      swal({
        title: "Login/Signup!",
        text: "Please Login/Singup first to view your profile",
        icon: "warning",
        button: "Okay!",
      });
      history.push("/login");
    }
  };

  const getAddress = async () => {
    if(token){
    let result = await fetch("http://localhost:8000/addressListing", {
      method: "GET",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setAddress(result);
    }
    else{
      swal({
        title: "Login/Signup!",
        text: "Please Login/Singup first to view your profile",
        icon: "warning",
        button: "Okay!",
      });
      history.push("/login");
    }
  };

  const removeAddress = async (id) => {
    if(token){
    let result = await fetch(`http://localhost:8000/removeAddress/${id}`, {
      method: "post",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setAddress(result);
    }
    else{
      swal({
        title: "Login/Signup!",
        text: "Please Login/Singup first to view your profile",
        icon: "warning",
        button: "Okay!",
      });
      history.push("/login");
    }
  };
  
  const getOrderHistory = async () => {
    if(token){
    let result = await fetch("http://localhost:8000/myOrder", {
      method: "GET",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setOrderHistory(result);
    //console.log("result", result);
    }
    else{
      swal({
        title: "Login/Signup!",
        text: "Please Login/Singup first to view your profile",
        icon: "warning",
        button: "Okay!",
      });
      history.push("/login"); 
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    CongoAlertLogout();
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

  const Loading = () => {
    return (
      <>
        <div className="user_loading">
          <Skeleton height={600} width={350} />

          <div>
            <Skeleton height={250} width={500} />
          </div>
          <div className="marginleft">
            <Skeleton height={100} width={300} />
          </div>
        </div>
      </>
    );
  };

  const NoAddressAndNoorderFound = () => {
    //console.log("Showing Profile with no address & no order");
    return (
      <section className="margin_bottom-for-user">
        <div className="container rounded bg-white mt-4">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Profile</b>
                  </h6>
                </div>
                <div className="d-flex flex-column" id="user-profile-card">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      className="rounded-circle "
                      width="100px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      alt="User Profile"
                    />
                    <div className="d-flex flex-row" id="margin_user">
                      <div className="font-weight-bold">
                        <b>
                          {profile.firstName} {profile.lastName}
                        </b>
                      </div>
                      &nbsp;
                    </div>
                  </div>
                  <hr></hr>
                  <div className="text-left p-2">
                    <div className="col-md-12">
                      <label htmlFor="firstName">
                        <b>First Name :</b> {profile.firstName}
                      </label>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="lastName">
                        <b>Last Name :</b> {profile.lastName}
                      </label>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="Email_id">
                        <b>Email ID :</b> {profile.email}
                      </label>
                    </div>
                    {/* <div className="col-md-12">
                                        <label htmlFor="Email_id"><b>Mobile No :</b> {profile.mobile}</label>
                                    </div> */}
                    <br></br>
                    <div className="d-flex flex-column align-items-center">
                      <NavLink to="/EditProfile">
                        <button
                          className="btn btn-primary profile-button"
                          type="button"
                        >
                          update profile
                        </button>
                      </NavLink>
                    </div>
                    <br></br>
                    <div className="d-flex flex-column align-items-center">
                      <NavLink to="/ChangePassword">
                        <button
                          className="btn btn-primary profile-button"
                          type="button"
                        >
                          Change Password
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={() => logout()}
                  >
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="order_text">
                    <b>My Addresses</b>
                  </h6>
                  <div>
                    <NavLink to="/AddAddress">
                      <button
                        className="btn btn-primary profile-button"
                        type="button"
                      >
                        Add New Address
                      </button>
                    </NavLink>
                  </div>
                </div>
                <div
                  className="row mt-2 p-3 list-group mb-3"
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

            <div className="col-md-4">
              <div className="py-5">
                <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
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
    //console.log("Showing Profile with no order");
    return (
      <section className="margin_bottom-for-user">
        <div className="container rounded bg-white mt-4">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Profile</b>
                  </h6>
                </div>
                <div className="d-flex flex-column" id="user-profile-card">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      className="rounded-circle "
                      width="100px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      alt="User Profile"
                    />
                    <div className="d-flex flex-row" id="margin_user">
                      <div className="font-weight-bold">
                        <b>
                          {profile.firstName} {profile.lastName}
                        </b>
                      </div>
                      &nbsp;
                    </div>
                  </div>
                  <hr></hr>
                  <div className="text-left p-2">
                    <div className="col-md-12">
                      <label htmlFor="firstName">
                        <b>First Name :</b> {profile.firstName}
                      </label>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="lastName">
                        <b>Last Name :</b> {profile.lastName}
                      </label>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="Email_id">
                        <b>Email ID :</b> {profile.email}
                      </label>
                    </div>
                    {/* <div className="col-md-12">
                                        <label htmlFor="Email_id"><b>Mobile No :</b> {profile.mobile}</label>
                                    </div> */}
                    <br></br>
                    <div className="d-flex flex-column align-items-center">
                      <NavLink to="/EditProfile">
                        <button
                          className="btn btn-primary profile-button"
                          type="button"
                        >
                          update profile
                        </button>
                      </NavLink>
                    </div>
                    <br></br>
                    <div className="d-flex flex-column align-items-center">
                      <NavLink to="/ChangePassword">
                        <button
                          className="btn btn-primary profile-button"
                          type="button"
                        >
                          Change Password
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={() => logout()}
                  >
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="order_text">
                    <b>My Addresses</b>
                  </h6>
                  <div>
                    <NavLink to="/AddAddress">
                      <button
                        className="btn btn-primary profile-button"
                        type="button"
                      >
                        Add New Address
                      </button>
                    </NavLink>
                  </div>
                </div>
                {address.map((addressObj) => (
                  <div
                    className="row mt-2 p-3 list-group mb-3"
                    id="user-profile-card"
                    key={addressObj._id}
                  >
                    <div className="col-md-12 row mb-2">
                      <div className="col-md-12">
                        <label htmlFor="lastName" className="form-label">
                          {addressObj.addressLine1}
                        </label>
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="lastName" className="form-label">
                          {addressObj.addressLine2}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          Town/City : {addressObj.cityName}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          District : {addressObj.district}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          State : {addressObj.state}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          Zip Code : {addressObj.zipCode}
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div className="text-center">
                      <NavLink to={`/EditAddress/${addressObj._id}`}>
                        <button
                          className="btn btn-primary profile-button"
                          type="button"
                          id="user_address"
                        >
                          {" "}
                          Edit Address{" "}
                        </button>
                      </NavLink>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger profile-button"
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

            <div className="col-md-4">
              <div className="py-5">
                <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
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

  //console.log(orderHistory);

  const NoAddressFound = () => {
    console.log("Showing Profile with no address");
    return (
      <section className="margin_bottom-for-user">
        <div className="container rounded bg-white mt-4">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Profile</b>
                  </h6>
                </div>
                <div className="d-flex flex-column" id="user-profile-card">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      className="rounded-circle "
                      width="100px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      alt="User Profile"
                    />
                    <div className="d-flex flex-row" id="margin_user">
                      <div className="font-weight-bold">
                        <b>
                          {profile.firstName} {profile.lastName}
                        </b>
                      </div>
                      &nbsp;
                    </div>
                  </div>
                  <hr></hr>
                  <div className="text-left p-2">
                    <div className="col-md-12">
                      <label htmlFor="firstName">
                        <b>First Name :</b> {profile.firstName}
                      </label>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="lastName">
                        <b>Last Name :</b> {profile.lastName}
                      </label>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="Email_id">
                        <b>Email ID :</b> {profile.email}
                      </label>
                    </div>
                    {/* <div className="col-md-12">
                                        <label htmlFor="Email_id"><b>Mobile No :</b> {profile.mobile}</label>
                                    </div> */}
                    <br></br>
                    <div className="d-flex flex-column align-items-center">
                      <NavLink to="/EditProfile">
                        <button
                          className="btn btn-primary profile-button"
                          type="button"
                        >
                          update profile
                        </button>
                      </NavLink>
                    </div>
                    <br></br>
                    <div className="d-flex flex-column align-items-center">
                      <NavLink to="/ChangePassword">
                        <button
                          className="btn btn-primary profile-button"
                          type="button"
                        >
                          Change Password
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={() => logout()}
                  >
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="order_text">
                    <b>My Addresses</b>
                  </h6>
                  <div>
                    <NavLink to="/AddAddress">
                      <button
                        className="btn btn-primary profile-button"
                        type="button"
                      >
                        Add New Address
                      </button>
                    </NavLink>
                  </div>
                </div>
                <div
                  className="row mt-2 p-3 list-group mb-3"
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

            <div className="col-md-4">
              <div className="py-5">
                <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Orders</b>
                  </h6>
                </div>
                {orderHistory.map((orderHistory) => {
                  return orderHistory.products.map((products) => {
                    return (
                      <ul className="list-group" key={orderHistory._id}>
                        <li className="d-flex justify-content-between mb-3">
                          <div className="user-card">
                            <img
                              src={products.productImageurl1}
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
                              {/* <div className="cart-lastrow">
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
        <div className="container rounded bg-white mt-4">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Profile</b>
                  </h6>
                </div>
                <div className="d-flex flex-column" id="user-profile-card">
                  <div className="d-flex flex-column align-items-center">
                    <div>

                      
                        
                              <label for="image">
                                  <input type="file" name="image" id="image" className="NoneImg" onChange={(e) => {setImage(e.target.files[0]);}} onClick={() => DoImgTickEdit()}/>
                                  <img alt="Edit Profile" className="rounded-circle" id="Edit_Img" width="30px" src={ImgTickEdit}/>
                              </label>
                     
                    
                    <img
                      className="rounded-circle "
                      width="100px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      alt="User Profile"
                    />
                    </div>
                    <div className="d-flex flex-row" id="margin_user">
                      <div className="font-weight-bold">
                        <b>
                          {profile.firstName} {profile.lastName}
                        </b>
                      </div>
                      &nbsp;
                    </div>
                  </div>
                  <hr></hr>
                  <div className="text-left p-2">
                    <div className="col-md-12">
                      <label htmlFor="firstName">
                        <b>First Name :</b> {profile.firstName}
                      </label>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="lastName">
                        <b>Last Name :</b> {profile.lastName}
                      </label>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="Email_id">
                        <b>Email ID :</b> {profile.email}
                      </label>
                    </div>
                    {/* <div className="col-md-12">
                                        <label htmlFor="Email_id"><b>Mobile No :</b> {profile.mobile}</label>
                                    </div> */}
                    <br></br>
                    <div className="d-flex flex-column align-items-center">
                      <NavLink to="/EditProfile">
                        <button
                          className="btn btn-primary profile-button"
                          type="button"
                        >
                          Edit profile
                        </button>
                      </NavLink>
                    </div>
                    <br></br>
                    <div className="d-flex flex-column align-items-center">
                      <NavLink to="/ChangePassword">
                        <button
                          className="btn btn-primary profile-button"
                          type="button"
                        >
                          Change Password
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={() => logout()}
                  >
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="order_text">
                    <b>My Addresses</b>
                  </h6>
                  <div>
                    <NavLink to="/AddAddress">
                      <button
                        className="btn btn-primary profile-button"
                        type="button"
                      >
                        Add New Address
                      </button>
                    </NavLink>
                  </div>
                </div>
                {address.map((addressObj) => (
                  <div
                    className="row mt-2 p-3 list-group mb-3"
                    id="user-profile-card"
                    key={addressObj._id}
                  >
                    <div className="col-md-12 row mb-2">
                      <div className="col-md-12">
                        <label htmlFor="lastName" className="form-label">
                          {addressObj.addressLine1}
                        </label>
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="lastName" className="form-label">
                          {addressObj.addressLine2}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          Town/City : {addressObj.cityName}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          District : {addressObj.district}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          State : {addressObj.state}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          Zip Code : {addressObj.zipCode}
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div className="text-center">
                      <NavLink to={`/EditAddress/${addressObj._id}`}>
                        <button
                          className="btn profile-button"
                          type="button"
                          id="user_address"
                        >
                          {" "}
                          Edit Address{" "}
                        </button>
                      </NavLink>{" "}
                      &nbsp;
                      <button
                        className="btn profile-button"
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

            <div className="col-md-4">
              <div className="py-5">
                <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <h6 className="order_text">
                    <b>My Orders</b>
                  </h6>
                </div>
                  {/* <div
                        className={"container " + (open ? "expand" : "")}
                        onClick={handleClick}
                      >
                        <div className="upper">
                          <p>June 10</p>
                          <h3>
                            A family saga with a supernatural twist, set in a German town, where
                            the disappearance of two young children exposes            
                          </h3>
                        </div>
                        <div className="lower">
                            <p>June 10</p>
                            <h3>
                              A family saga with a supernatural twist, set in a German town, where
                              the disappearance of two young children exposes...
                            </h3>
                        </div>
                      </div>    */}
                {orderHistory.map((orderHistory) => {
                  return orderHistory.products.map((products) => {
                    return orderHistory.address.map((address) => {
                    return (
                      <ul className="list-group" key={orderHistory._id}>
                        <li className="d-flex justify-content-between mb-3">
                          <div className={CardState} onClick={ () => ClickedtheCard()}>
                            <img
                              src={products.productImageurl1}
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
                              { (CardState!=="user-card") ? 
                              
                              <div>
                                  <div className="user-card-price">
                                    Address : {address.addressLine1}
                                  </div>

                                  <div className="user-card-price">
                                    City : {address.cityName}
                                  </div> 

                                  <div className="user-card-price">
                                    District : {address.district}
                                  </div> 
                              </div>    
                                  
                                  : 
                                  
                                  <></>
                              
                              
                              }
                            </div>
                          </div>
                        </li>
                      </ul>
                    );
                    });
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
