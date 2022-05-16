import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Empty from "./Empty.gif";
import Skeleton from "react-loading-skeleton";
import swal from "sweetalert";

const Cart = () => {
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    getcartItem();
    Protected_Route();
    // setTimeout(() => {
    //
    // }, 3000);
  }, []);

  const Protected_Route = (props) => {
    const token = localStorage.getItem("token");
    if (token == null) {
      CongoAlert();
    }
  };

  // cart api fatching
  const getcartItem = async () => {
    let result = await fetch("https://vmart-api.herokuapp.com/myCartItem", {
      method: "GET",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setCartItem(result);
    //setLoading(false);
  };

  const removeFromCart = async (id) => {
    let result = await fetch(`https://vmart-api.herokuapp.com/removeFromCart/${id}`, {
      method: "post",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setCartItem(result);
  };

  const CongoAlert = () => {
    swal({
      title: "Login/Signup!",
      text: "Please Login/Singup first to view your cart",
      icon: "warning",
      button: "Okay!",
    });
    history.push("/login");
  };

  const Loading = () => {
    return (
      <>
        <div className="loading_screen_cart">
          <div>
            <Skeleton height={250} width={400} />
          </div>
          <div>
            <Skeleton height={250} width={400} />
          </div>
          <div>
            <Skeleton height={250} width={400} />
          </div>

          <div>
            <Skeleton height={250} width={400} />
          </div>
          <div>
            <Skeleton height={250} width={400} />
          </div>
          <div>
            <Skeleton height={250} width={400} />
          </div>
        </div>
      </>
    );
  };

  console.log("myCartItem", cartItem);

  const Cartisempty = () => {
    //if(cartItem === 0){
    return (
      <section className="cart-wrapper-empty">
        <div className="Empty-Cart">
          <img src={Empty} className="Empty-Cart-img" alt="Error-Img" />

          <div className="Empty-Text">
            <h2>Hey Your Cart is Empty</h2>
            <NavLink to="/">
              <h6>Contine Shoping</h6>
            </NavLink>
          </div>
        </div>
      </section>
    );
    //}
  };
  //console.log(cartItem);
  const ShowProducts = () => {
    return (
      <>
        <section className="cart-wrapper">
          {cartItem.map((cartObj) => (
            <div className="cart-card-container" key={cartObj._id}>
              <div>
                <div className="cart-card">
                  <img
                    src={cartObj.productImageurl}
                    alt="images"
                    className="cart-card-media"
                  />
                  <div className="cart-card-text">
                    <div className="cart-card-head">
                      {" "}
                      {cartObj.productName}{" "}
                    </div>
                    <div className="cart-card-price">
                      Price - {cartObj.productPrice}/-₹
                    </div>
                    <div class="cart-lastrow">
                      <div className="cart-card-category">
                        Category - {cartObj.productCategory}
                      </div>
                    </div>
                    <div>
                      <p className="lead">
                        {cartObj.quantity} X {cartObj.productPrice} ={" "}
                        {cartObj.quantity * cartObj.productPrice}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        removeFromCart(cartObj.productId);
                      }}
                    >
                      Remove
                    </button>
                    {/* <div className="plus-minus">
                                        <button className="btn btn-outline-dark" onClick={() => handleAdd(product)}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                        <p className="qty_font">
                                            {product.qty}
                                        </p>
                                        <button className="btn btn-outline-dark me-4" onClick={() => handleDel(product)}>
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <div className="row">
          <></>

          <NavLink
            to="/checkout"
            className="btn btn-outline-dark mb-5 w-25 mx-auto"
          >
            Proceed to Checkout
          </NavLink>
        </div>
      </>
    );
  };

  if (loading === true) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else if (cartItem.length === 0) {
    return (
      <div>
        <Cartisempty />
      </div>
    );
  } else {
    return (
      <div>
        <ShowProducts />
      </div>
    );
  }
};

export default Cart;
