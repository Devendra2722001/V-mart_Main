import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Empty from "./Empty.gif";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import swal from "sweetalert";

const Cart = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [cartItem, setCartItem] = useState([]);
  var token = localStorage.getItem("token");  
  let zeroStock = [];
  let AllcartItemId = [];

  useEffect(() => {
    window.scrollTo(0, 0);
    getcartItem();
    getProducts();
  }, []);

  const LoginAlert = () => {
    swal({
      title: "Login/Signup!",
      text: "Please Login/Singup first to view your cart",
      icon: "warning",
      button: "Okay!",
    });
    history.push("/login");
  };

  // cart api fatching
  const getcartItem = async () => {
    if(token){
      let result = await fetch("https://vmart-api.herokuapp.com/myCartItem", {
      method: "GET",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setCartItem(result);
    sessionStorage.setItem("Mycart", result.length);
    setLoading(false);    
    }else{
      LoginAlert();
    }
  };

  const removeFromCart = async (id) => {
    let result = await fetch(`https://vmart-api.herokuapp.com/removeFromCart/${id}`, {
      method: "post",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setCartItem(result);
    getcartItem();
    
  };

  const increaseQty = async (id) => {    
    let addone = await fetch(`https://vmart-api.herokuapp.com/increaseQuantity/${id}`, {
      method: "post",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    //addone = await addone.json();
    getcartItem();
    if(addone.status===400){
      swal({
        title: "Opps",
        text: "We're sorry! Only 5 unit(s) allowed in each order",
        icon: "warning",
        button: "Okay!",
      });
    }
  }
  
  const decreaseQty = async (id) => {    
    let removeone = await fetch(`https://vmart-api.herokuapp.com/decreaseQuantity/${id}`, {
      method: "post",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    removeone = await removeone.json();
    console.log(removeone.quantity);
    if(removeone.quantity === 0){
      removeFromCart(id);
    }
    getcartItem();
  }

  const getProducts = async () => {
    const response = await axios.get("https://vmart-api.herokuapp.com/getProduct");
    if(response.status===201){
      setData(response.data.products);     
      // checkForZerostock();
    }     
  };

  console.log("cartItem",cartItem);
 
  
    for (let i = 0; i < data.length; i++) {
      if (data[i].stock === 0) {
        zeroStock.push(data[i]);
    }      
    }

    for (let j = 0; j < cartItem.length; j++) {
      if (cartItem.length !== 0) {
        AllcartItemId.push(cartItem[j].productId);
    }      
    }

    const OppsAlert = () => {
      history.push("/cart")
      swal({
        title: "Errror!",
        text: "Found Item In your cart with Zero stock!",
        icon: "warning",
        button: "Okay!",
      });     
    };

    
const MatchIds = () =>{
  var a = 0;
  for(let k = 0; k < zeroStock.length; k++){
    for(let l = 0; l<AllcartItemId.length ; l++ ){

      if(a === 1){
       console.log("break");
      }

      else if(zeroStock[k]._id === AllcartItemId[l]){  
        console.log("Found Item In your cart with Zero stock",zeroStock[k]);
        history.push("/cart")
        swal({
          title: "Errror!",
          text: `Opps Looks like ${zeroStock[k].name} is out of stock!`,
          icon: "warning",
          button: "Okay!",
        }); 
        a = 1;
      }

      // if(zeroStock[k] === AllcartItemId[l]){
        
      // }
    }     
  }
  if (a===0){
    console.log("checkout");
    history.push("/checkout")
  }
}
  console.log("AllcartItemId",AllcartItemId);
  console.log("zeroStockItems",zeroStock);

  
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

  //console.log("myCartItem", cartItem);

  const Cartisempty = () => {
    //if(cartItem === 0){
    return (
      <section className="cart-wrapper-empty">
        <div className="Empty-Cart">
          <img src={Empty} className="Empty-Cart-img" alt="Error-Img" />

          <div className="Empty-Text">
            <h2>Hey Your Cart is Empty</h2>
            <NavLink to="/">
              <h6>Continue Shopping</h6>
            </NavLink>
          </div>
        </div>
      </section>
    );
    //}
  };
  console.log(cartItem);
  const ShowProducts = () => {
    return (
      <>
        <section className="cart-wrapper">
          {cartItem.map((cartObj) => (
            <div className="cart-card-container" key={cartObj._id}>
              <div>
                <div className="cart-card">
                  <img
                    src={cartObj.productImageurl1}
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
                    <div className="cart-lastrow">
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

                    <div className="plus-minus">
                        <button className="btn btn-outline-dark" id="plus-minus_btn_m" onClick={() => {decreaseQty(cartObj.productId);}}>
                          <i className="fa fa-minus"></i>
                        </button>
                        <p className="qty_font">{cartObj.quantity}</p>
                        <button className="btn btn-outline-dark" id="plus-minus_btn_p" onClick={() => {increaseQty(cartObj.productId);}}>
                        <i className="fa fa-plus"></i>
                      </button>
                      
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <>

        <div className="row">
          <div className="btn btn-outline-dark mb-5 w-25 mx-auto" onClick={ () => {MatchIds();}}>
            Proceed to Checkout
          </div>         
        </div>
          
        </> 


        
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
