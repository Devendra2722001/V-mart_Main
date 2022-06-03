import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const Checkout = () => {
  const history = useHistory();
  const [address, setAddress] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [cartId, setCartId] = useState([]);
  const [addId, setaddId] = useState([]);

  const handleInputs = (e) => {
    let value = e.target.value 
    setaddId(value);
  };

  const postOrder = async (id, key) => {
      await axios.post(`https://vmart-api.herokuapp.com/order/${cartId}/${addId}`, {}, {
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    }).then((res) =>{
      console.log("post data responce :::", res);
      console.log("Data posted");
      if (res.status === 201) {
        CongoAlert();
        removeProduct();
        sendEmail();
      }
    }).catch((error) =>{
      console.log("PPP>>", error.response.status);
      if(error.response.status === 404 || error.response.status === 500) {
        somethingWentWrong();
      } 
    })
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAddress();
    getcartItem();
    getcartId();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const sendEmail = async () => {
      await axios.post(`https://vmart-api.herokuapp.com/sendmsg`, {}, {
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    }).then((res) => {
      console.log("send mail responce:::", res);
      if (res.status === 200) {
        console.log("mail send in your mail");
      } else {
        console.log("opps!!!");
      }
    })
  };

  const CongoAlert = () => {
    swal({
      title: "Success!",
      text: "Congratulations your order has been placed successfully!",
      icon: "success",
      button: "Okay!",
    });
    history.push("/");
  };

  const somethingWentWrong = () => {
    swal({
      title: "Opps!",
      text: "Something went wrong! Please try again.",
      icon: "error",
      button: "Okay!",
    });
    history.push("/");
  };

  const CongoAlertOps = () => {
    swal({
      title: "Errror!",
      text: "Please Select an address to proceed further!",
      icon: "warning",
      button: "Okay!",
    });
  };

  const CongoAlertAddress = () => {
    swal({
      title: "Errror!",
      text: "Please Add an address to proceed further!",
      icon: "warning",
      button: "Okay!",
    });
    history.push("/AddAddress");
  };

  const getAddress = async () => {
    await axios.get("https://vmart-api.herokuapp.com/addressListing", {
    headers: {
      "Content-Type": "application/json",
      token: JSON.parse(localStorage.getItem("token")),
    }
    }).then((res) => {
      console.log("responce of address listing:::" , res);
      setAddress(res.data);
      if(res.data.length===0){
        CongoAlertAddress();
      }
    }) 
  };

  const getcartItem = async () => {
    await axios.get("https://vmart-api.herokuapp.com/myCartItem", {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    }).then((res) => {
      setCartItem(res.data);
    })     
  };

  console.log("cartItem",cartItem);

  console.log("cartItem ----------------------------",cartId);

  let pricearray = [];
  for (let i = 0; i < cartItem.length; i++) {
    let allitem = cartItem;
    let priceofitem = allitem[i].productPrice;
    if (priceofitem !== null) {
      pricearray.push(priceofitem);
    }
  }
  console.log("pricearray", pricearray);

  let qntarray = [];
  for (let q = 0; q < cartItem.length; q++) {
    let allitem = cartItem;
    let qntofitem = allitem[q].quantity;
    if (qntofitem !== null) {
      qntarray.push(qntofitem);
    }
  }

  let mularray = [];
  for (let m = 0; m < cartItem.length; m++) {
    mularray.push(qntarray[m] * pricearray[m]);
  }

  let sum = 0;
  for (let s = 0; s < cartItem.length; s++) {
    sum += mularray[s];
  }  

  const getcartId = async () => {
      let res = await axios.get("https://vmart-api.herokuapp.com/myCartId", {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    console.log("my cart id..........", res);
    setCartId(res.data);
  };

  const removeProduct = async () => {
    await axios.post("https://vmart-api.herokuapp.com/removeAllProduct", {}, {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    sessionStorage.setItem("Mycart", 0);
  };

  const clickedMeForCheckout = (e) => {
    e.preventDefault();

    if (addId.length === 0) {
      
      CongoAlertOps();
    } else {
      postOrder();
    }
  };

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
                        className="w-100 btn btn-danger btn-lg"
                        onClick={() => {
                          history.push("/cart");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-100 btn btn-primary btn-lg"
                        onClick={(e) => {
                          clickedMeForCheckout(e);
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
