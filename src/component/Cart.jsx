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
  var token = localStorage.getItem("token")   
  let zeroStock = [];
  let AllcartItemId = [];
  let allProductStock = [];

  useEffect(() => {
    window.scrollTo(0, 0);
    getcartItem();
    getProducts();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const LoginAlert = () => {
    swal({
      title: "Login/Signup!",
      text: "Please Login/Singup first to view your cart",
      icon: "warning",
      button: "Okay!",
    });
    history.push("/login");
  };

  const getcartItem = async () => {
    if(token){
      await axios.get("http://localhost:8000/myCartItem", {
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    })
    .then((res)=>{
      console.log(" responce of get cart item:::",res);
      if(res.status === 200) {
        setCartItem(res.data);
      sessionStorage.setItem("Mycart", res.data.length);
      setLoading(false);
      }
      
    })
    .catch((e) =>{
      console.log("error of get cart item:::",e);
    })
    }else{
      LoginAlert();
    }
  };

  const removeFromCart = async (id) => {
    await axios.post(`http://localhost:8000/removeFromCart/${id}`,{}, {
      headers: {
      "Content-Type": "application/json",
      token: JSON.parse(localStorage.getItem("token")), 
    },
  }).then((res) =>{
      console.log("responce of remove from cart:::",res)
      setCartItem(res.data);
      getcartItem();
  }).catch((e) =>{
    console.log("Error of remove from cart:::",e)
  })
  };

  const increaseQty = async (id) => {    
    await axios.post(`http://localhost:8000/increaseQuantity/${id}`,{}, {
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    })
    .then((res) =>{
      //console.log("responce of increase quantity:::", res)
    }).catch((error) => {
      if(error.response.status === 400){
        //console.log("",res.status);
        swal({
          title: "Opps",
          text: "We're sorry! Only 5 unit(s) allowed in each order",
          icon: "warning",
          button: "Okay!",
        });
      }
      else if(error.response.status === 401){
        swal({
          title: "Opps",
          text: `We're sorry! Currently no more unit(s) available`,
          icon: "warning",
          button: "Okay!",
        });
      }
    })
    getcartItem()
  }
  
  const decreaseQty = async (id) => {    
    await axios.post(`http://localhost:8000/decreaseQuantity/${id}`,{}, {
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    }).then((res) =>{
      console.log("responce of decrease cart quantity:::", res);
      console.log(res.data.quantity);
      if(res.data.quantity === 0){
        removeFromCart(id);
      }
    })
    getcartItem();
  };

  

  const getProducts = async () => {
    if(token !== null){
      const response = await axios.get("http://localhost:8000/getProduct");
        if(response.status===201){
          setData(response.data.products);
        }
    }
  };

  //console.log("cartItem",cartItem);
 
  
    for (let i = 0; i < data.length; i++) {
      if (data[i].stock === 0) {
        zeroStock.push(data[i]);
    }      
    }

    for (let t = 0; t < data.length; t++) {
      if (data[t].stock > 0) {
        allProductStock.push(data[t]);
    }      
    }

    console.log("allProductStock",allProductStock);

    for (let j = 0; j < cartItem.length; j++) {
      if (cartItem.length !== 0) {
        AllcartItemId.push(cartItem[j]);
    }      
    }
    
const MatchIds = () =>{

  var b = 0;
    for(let o = 0; o < allProductStock.length; o++){
      for(let p = 0; p<AllcartItemId.length ; p++ ){
  
        if(b === 1){
          console.log("break");
           break;
        }
        
        if(allProductStock[o].stock < AllcartItemId[p].quantity){  
          console.log("-------------------------------------------------------------------");
          console.log("Found Item In your cart with  Lower stock then cart qnt",allProductStock[o]);
          console.log("-------------------------------------------------------------------");
          history.push("/cart")
          swal({
            title: "Errror!",
            text: `${allProductStock[o].name} is at low stock please reduce some`,
            icon: "warning",
            button: "Okay!",
          }); 
           b = 1;
        }
      }     
    }
     
  var a = 0;
  for(let k = 0; k < zeroStock.length; k++){
    for(let l = 0; l<AllcartItemId.length ; l++ ){

      if(a === 1){
        console.log("break");
        break;
      }
      
      else if(zeroStock[k]._id === AllcartItemId[l].productId){  
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
    }     
  }
  if (a===0 && b===0){
    console.log("checkout");
    history.push("/checkout")
  }
}
  
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
  };
  const ShowProducts = () => {
    return (
      <>
        <section className="cart-wrapper">
          {cartItem.map((cartObj) => (
           
            <div className="cart-card-container" key={cartObj._id}>
              <div>
                <div className="cart-card">
                <NavLink to={`/productlist/${cartObj.productId}`} id="copyright">
                  <img
                    src={cartObj.productImageurl1}
                    alt="images"
                    className="cart-card-media"
                  /></NavLink>
                  
                  <div className="cart-card-text">
                  <NavLink to={`/productlist/${cartObj.productId}`} id="copyright">
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
                    </NavLink>
                    
                    <div className="plus-minus">
                      <button
                        className="btn btn-outline-dark"
                        id="plus-minus_btn_m"
                        onClick={() => {
                          decreaseQty(cartObj.productId);
                        }}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                      <p className="qty_font">{cartObj.quantity}</p>
                      <button
                        className="btn btn-outline-dark"
                        id="plus-minus_btn_p"
                        onClick={() => {
                          increaseQty(cartObj.productId);
                        }}
                      >
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
          <div
            className="btn btn-outline-dark mb-5 w-25 mx-auto"
            onClick={()=>{history.go(-1)}}
          >
            Cancel
          </div>
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
