import React, { useState, useEffect } from "react";
//import { useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import swal from "sweetalert";

const Checkout = () => {
  const history = useHistory();
  //const state = useSelector((state) => state.handleCart)
  const [address, setAddress] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [cartId, setCartId] = useState([]);
  const [addId, setaddId] = useState([]);

  const { _id } = useParams();

  const [order, setOrder] = useState({
    address: "",
  });

  let name,
    value,
    key = cartId;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setOrder({ [name]: value });
    setaddId(value);
  };

  const PostOrder = async (id, key) => {
    sendEmail();
    let result = await fetch(`http://localhost:8000/order/${cartId}/${addId}`, {
      method: "POST",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    console.log("Data posted");
  };

  useEffect(() => {
    getAddress();
    getcartItem();
    getcartId();
  }, []);

  const sendEmail = async () => {
    let mailsent = await fetch(`http://localhost:8000/sendmsg`, {
      method: "POST",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    mailsent = await mailsent.json();
    if (mailsent.status === 200) {
      console.log("mail send in your mail");
    } else {
      console.log("opps!!!");
    }
  };

  const CongoAlert = () => {
    //sendEmail();
    swal({
      title: "Success!",
      text: "Congratulations your order has been placed successfully!",
      icon: "success",
      button: "Okay!",
    });
    history.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    //
  };

  const CongoAlertOps = () => {
    swal({
      title: "Errror!",
      text: "Please Select an address to proceed further!",
      icon: "warning",
      button: "Okay!",
    });
    //window.alert("Select Adress")
    //history.push("/");
    //
  };

  const CongoAlertAddress = () => {
    swal({
      title: "Errror!",
      text: "Please Add an address to proceed further!",
      icon: "warning",
      button: "Okay!",
    });
    //window.alert("Select Adress")
    history.push("/AddAddress");
    //
  };

  const getAddress = async () => {
    let result = await fetch("http://localhost:8000/addressListing", {
      method: "GET",
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setAddress(result);
    console.log("result check",result);

    if(result.length===0){
      CongoAlertAddress();
    }
  };

  const getcartItem = async () => {
    let cartItem = await fetch("http://localhost:8000/myCartItem", {
      method: "GET",
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    cartItem = await cartItem.json();
    setCartItem(cartItem);    
  };

  console.log("cartItem",cartItem);

  console.log("cartItem ----------------------------",cartId);
  //let priceofall = cartItem.productPrice.json()
  //console.log(priceofall)
  //console.log(cartItem)
  //const prize = cartItem.productPrice;
  //console.log(prize)

  let pricearray = [];
  for (let i = 0; i < cartItem.length; i++) {
    let allitem = cartItem;
    let priceofitem = allitem[i].productPrice;
    if (priceofitem !== null) {
      //console.log("truing to add price");
      pricearray.push(priceofitem);
    }
    // pricearray.push(priceofitem[i]);
    // break;
  }
  console.log("pricearray", pricearray);

  let qntarray = [];
  for (let q = 0; q < cartItem.length; q++) {
    let allitem = cartItem;
    let qntofitem = allitem[q].quantity;
    if (qntofitem !== null) {
      //console.log("truing to add price");
      qntarray.push(qntofitem);
    }
    // pricearray.push(priceofitem[i]);
    // break;
  }
  //console.log("qntarray",qntarray);

  let mularray = [];
  for (let m = 0; m < cartItem.length; m++) {
    mularray.push(qntarray[m] * pricearray[m]);
  }
  //console.log("mularray",mularray);

  let sum = 0;
  for (let s = 0; s < cartItem.length; s++) {
    sum += mularray[s];
  }
  console.log("Total of products is :", sum);

  const getcartId = async () => {
    let cartId = await fetch("http://localhost:8000/myCartId", {
      method: "GET",
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    cartId = await cartId.json();
    setCartId(cartId);
  };

  const removeProduct = async () => {
    let emptyCart = await fetch("http://localhost:8000/removeAllProduct", {
      method: "POST",
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    if (emptyCart.status === 200) {
      console.log("cart empty");
      //window.location.reload();
    }
  };

  const Clickedmeforcheckout = (e) => {
    e.preventDefault();

    if (addId.length == 0) {
      console.log("Failed");
      CongoAlertOps();
    } else {
      PostOrder();
      removeProduct();

      CongoAlert();
    }
  };

  //console.log(cartItem)

  return (
    <>
      <div className="checkout-main">
        <div className="container my-5">
          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
              </h4>
              <ul className="list-group mb-3">
                {cartItem.map((cartObj, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between lh-sm"
                  >
                    <div>
                      <h6 className="my-0" name="cart">
                        {cartObj.productName}
                      </h6>
                    </div>
                    <span className="text-muted">
                      {cartObj.quantity} X {cartObj.productPrice} ={" "}
                      {cartObj.quantity * cartObj.productPrice}
                    </span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (IND-₹)</span>
                  <strong>{sum}</strong>
                </li>
              </ul>
            </div>

            <div className="col-md-7 col-lg-8">
              <form className="needs-validation" novalidate="">
                <div className="form-outline flex-fill">
                  <h4 className="d-flex justify-content-between align-items-center">
                    <span className="text-primary">Select address</span>
                  </h4>

                  <div className="p-3">
                    {address.map((addressObj) => (
                      <>
                        <div
                          className="row mt-2 p-3"
                          id="list-group-item"
                          key={addressObj._id}
                        >
                          <div className="col-md-12">
                            <label htmlFor="firstName" className="form-label">
                              <h5>
                                <span className="text-primary">
                                  <input
                                    type="radio"
                                    onChange={handleInputs}
                                    name="address"
                                    value={addressObj._id}
                                  />{" "}
                                  {addressObj.addressLine2}
                                </span>
                              </h5>
                            </label>
                            <div className="form-label mb-2">
                              {addressObj.addressLine1}
                            </div>
                            {/* <div className="add-card-head mb-2">{addressObj.addressLine2}</div> */}
                          </div>
                          <div className="col-md-12 row mb-2">
                            <div className="col-md-3">
                              <label htmlFor="lastName" className="form-label">
                                <b>City</b>
                              </label>
                              <div className="form-label">
                                {addressObj.cityName}
                              </div>
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="lastName" className="form-label">
                                <b>District</b>
                              </label>
                              <div className="form-label">
                                {addressObj.district}
                              </div>
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="lastName" className="form-label">
                                <b>State</b>
                              </label>
                              <div className="form-label">
                                {addressObj.state}
                              </div>
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="lastName" className="form-label">
                                <b>Zip Code</b>
                              </label>
                              <div className="form-label">
                                {addressObj.zipCode}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                    <div className="mt-5">
                      <button
                        className="w-100 btn btn-primary btn-lg"
                        onClick={(e) => {
                          Clickedmeforcheckout(e);
                        }}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
