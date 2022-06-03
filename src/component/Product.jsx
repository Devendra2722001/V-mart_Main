import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { css } from 'glamor';
import axios from "axios";

toast.configure();
const Product = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartBtn, setCartBtn] = useState("Add To Cart");
  const [favBtn, setFavBtn] = useState("Add To Favorites");
  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct();
    if(localStorage.getItem("token" !== null)){      
      Checkforcart();
      Checkforfav();
    }    
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const Checkforcart = async () => {
    let result = await axios.get("https://vmart-api.herokuapp.com/myCartItem", {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = result.data;
    console.log("got cart data::::::::::",result);
    setCartItem(result.length);
    console.log("got result length:::::::::",result.length);

    for (let i = 0; i < result.length; i++) {
      let item_ids = result[i].productId;
      if (item_ids === _id) {
        setCartBtn("Remove From Cart");
      } else {
        setCartBtn("Add To Cart");
      }
    }    
    
  };
  console.log("cartItem",cartItem);
  sessionStorage.setItem("Mycart", cartItem);

  const Checkforfav = async () => {
    let Favresult = await axios.get("https://vmart-api.herokuapp.com/myfavouritetItem", {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    Favresult = Favresult.data;
    console.log("got Fav data:-", Favresult);
    console.log("got result length data:::::::::",Favresult.length);

    for (let i = 0; i < Favresult.length; i++) {
      let favitem_ids = Favresult[i].productId;
      if (favitem_ids === _id) {
        setFavBtn("Remove From Favorites");
      } else {
        setFavBtn("Add To Favorites");
      }
    }
  };

  const getProduct = async () => {
    const response = await axios.get(`https://vmart-api.herokuapp.com/singleProduct/${_id}`);
    let myRes = response.data
    setProduct(myRes);
    setLoading(false);
  };

  const addToCart = async (_id) => {
    await axios.post(`https://vmart-api.herokuapp.com/cart/${_id}`, {},{
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    toast(`${product.name} Added To cart`, {     
      position: toast.POSITION.TOP_LEFT,
      toastClassName: css({
        fontSize: '18px !important',
        backgroundColor: '#da1c36 !important',
        padding: '15px !important'
      }),      
    });
    Checkforcart();
  };

  const addTofav = async (_id) => {
    await axios.post(`https://vmart-api.herokuapp.com/favourite/${_id}`, {},  {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    toast(`${product.name} Added To Favorites`, {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const removeFromCart = async (_id) => {
    await axios.post(`https://vmart-api.herokuapp.com/removeFromCart/${_id}`, {}, {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    toast(`${product.name} Removed From Cart`, {
      position: toast.POSITION.TOP_LEFT,
    });
    Checkforcart();
  };

  const removeFromfav = async (_id) => {
    await axios.post(
      `https://vmart-api.herokuapp.com/removeFromFavourite/${_id}`,{},
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    toast(`${product.name} Removed From Favorites`, {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const dothething = () => {
    if (cartBtn === "Add To Cart") {
      console.log("---->");
      tryingToadd(product._id);
    } else {
      tryingToremove(product._id);
    }
  };

  const dothethingforfav = () => {
    if (favBtn === "Add To Favorites") {
      tryingToaddfav(product._id);
    } else {
      tryingToremovefav(product._id);
    }
  };

  const tryingToadd = (_id) => {
    if (cartBtn === "Add To Cart") {
      addToCart(_id);
      setCartBtn("Remove From Cart");
    } else {

    }
  };

  const tryingToremove = (_id) => {
    if (cartBtn === "Remove From Cart") {
      console.log("Trying To Remove from cart");
      removeFromCart(_id);
      setCartBtn("Add To Cart");
    }
  };

  const tryingToaddfav = (_id) => {
    if (favBtn === "Add To Favorites") {
      addTofav(_id);
      setFavBtn("Remove From Favorites");
    }
  };

  const tryingToremovefav = (_id) => {
    if (favBtn === "Remove From Favorites") {
      console.log("Trying To Remove from Fav");
      removeFromfav(_id);
      setFavBtn("Add To Favorites");
    }
  };

  const Protected_Route_Cart = (props) => {
    const token = localStorage.getItem("token");
    if (token == null) {
      CongoAlert();
    } else {
      dothething();
    }
  };

  const Protected_Route_Fav = (props) => {
    const token = localStorage.getItem("token");
    if (token == null) {
      CongoAlertFav();
    } else {
      dothethingforfav();
    }
  };

  const CongoAlert = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Login/Signup!...',
      text: 'Please Login to add item to your cart',      
      footer: '<a href="/login">Login Here</a>'
    })
   
  };

  const CongoAlertFav = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Login/Signup!...',
      text: 'Please Login to add item to your favorites',      
      footer: '<a href="/login">Login Here</a>'
    })
    
  };

  const Loading = () => {
    return (
      <>
        <div className="loading_screen_product">
          <div className="loading_screen_product_img">
            <div>
              <Skeleton height={150} width={150} />
            </div>
            <div>
              <Skeleton height={150} width={150} />
            </div>
            <div>
              <Skeleton height={150} width={150} />
            </div>
          </div>
          <div className="loading_screen_product_img_big">
            <div>
              <Skeleton height={500} width={500} />
            </div>
          </div>
        </div>
      </>
    );
  };

  console.log(product);

  const ShowProductMobile = () => {
    return (
      <>
        <h6 className="bread_crum_text">
          <NavLink to="/" id="copyright">
            Home
          </NavLink>{" "}
          /{" "}
          <NavLink to={`/${product.category}`} id="copyright">
            {product.category}{" "}
          </NavLink>{" "}
          / {product.name}
        </h6>
        <div className="product-page">
          <div id="grid_1">
            <div id="Tproductimg">
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageUrl2}
                  alt={product.name}
                />
              </div>
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageUrl3}
                  alt={product.name}
                />
              </div>
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageUrl4}
                  alt={product.name}
                />
              </div>
            </div>
            <div className="product-media">
              <img
                className="product_img"
                src={product.imageUrl1}
                alt={product.name}
              />
            </div>
          </div>

          <div id="grid_2">
          {product.stock===0 ? 
          
          <>
          <b className="product-stock_red">
            This item is currently out of stock
          </b>
          </>
          
          : 
          
          <>{product.stock<10 ? 
          
            <div className="product-stock">
                Hurry, Only a few <b className="greenColorfont">{product.name}</b> left!
            </div>
            
            : 
            
            <></>}</>}  
            <div className="product-head"> {product.name} </div>
            <div className="product-price"> Price - {product.price}₹</div>
            <div className="product-category">
              Category - {product.category}
            </div>
            <div className="product-minitext">Ram - {product.RAM}</div>
            <div className="product-minitext">
              {" "}
              Screen HardDisk - {product.hardDisk}
            </div>
            <div className="product-minitext">
              {" "}
              Processor - {product.processor}
            </div>
            <div className="product-minitext">
              {" "}
              Product Description - {product.description}
            </div>

            <div className="addcartgocartBTN">
            {product.stock===0  && cartBtn === "Add To Cart" ? 
              <>
                <button
                  disabled
                  className="btn-add-item_Cart"                  
                >
                  {cartBtn}
                </button>
              </>
  
            : 
  
              <>
                <button                
                  className="btn-add-item"
                  onClick={() => {
                    Protected_Route_Cart();
                    console.log("Clicked Cartbtn");
                  }}
                >
                  {cartBtn}
                </button>
                </>}
              <button
                className="btn-add-item_fav"
                onClick={() => {
                  Protected_Route_Fav();
                  console.log("Clicked Favbtn");
                }}
              >
                {favBtn}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProductLaptop = () => {
    return (
      <>
        <h6 className="bread_crum_text">
          <NavLink to="/" id="copyright">
            Home
          </NavLink>{" "}
          /{" "}
          <NavLink to={`/${product.category}`} id="copyright">
            {product.category}{" "}
          </NavLink>{" "}
          / {product.name}
        </h6>
        <div className="product-page">
          <div id="grid_1">
            <div id="Tproductimg">
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageUrl2}
                  alt={product.name}
                />
              </div>
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageUrl3}
                  alt={product.name}
                />
              </div>
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageUrl4}
                  alt={product.name}
                />
              </div>
            </div>
            <div className="product-media">
              <img
                className="product_img"
                src={product.imageUrl1}
                alt={product.name}
              />
            </div>
          </div>

          <div id="grid_2">
          {product.stock===0 ? 
          
          <>
          <b className="product-stock_red">
            This item is currently out of stock
          </b>
          </>
          
          : 
          
          <>{product.stock<10 ? 
          
            <div className="product-stock">
                Hurry, Only a few <b className="greenColorfont">{product.name}</b> left!
            </div>
            
            : 
            
            <></>}</>}  
            <div className="product-head"> {product.name} </div>
            <div className="product-price"> Price - {product.price}₹</div>
            <div className="product-category">
              Category - {product.category}
            </div>
            <div className="product-minitext">Ram - {product.RAM}</div>
            <div className="product-minitext">
              {" "}
              Screen HardDisk - {product.hardDisk}
            </div>
            <div className="product-minitext">
              {" "}
              Processor - {product.processor}
            </div>
            <div className="product-minitext">
              {" "}
              Product Description - {product.description}
            </div>

            <div className="addcartgocartBTN">
            {product.stock===0  && cartBtn === "Add To Cart" ? 
              <>
                <button
                  disabled
                  className="btn-add-item_Cart"                  
                >
                  {cartBtn}
                </button>
              </>
  
            : 
  
              <>
                <button                
                  className="btn-add-item"
                  onClick={() => {
                    Protected_Route_Cart();
                    console.log("Clicked Cartbtn");
                  }}
                >
                  {cartBtn}
                </button>
                </>}
              <button
                className="btn-add-item_fav"
                onClick={() => {
                  Protected_Route_Fav();
                  console.log("Clicked Favbtn");
                }}
              >
                {favBtn}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProductShoes = () => {
    return (
      <>
        <h6 className="bread_crum_text">
          <NavLink to="/" id="copyright">
            Home
          </NavLink>{" "}
          /{" "}
          <NavLink to={`/${product.category}`} id="copyright">
            {product.category}{" "}
          </NavLink>{" "}
          / {product.name}
        </h6>
        <div className="product-page">
          <div id="grid_1">
            <div id="Tproductimg">
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageUrl2}
                  alt={product.name}
                />
              </div>
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageUrl3}
                  alt={product.name}
                />
              </div>
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageUrl4}
                  alt={product.name}
                />
              </div>
            </div>
            <div className="product-media">
              <img
                className="product_img"
                src={product.imageUrl1}
                alt={product.name}
              />
            </div>
          </div>

          <div id="grid_2">

          {product.stock===0 ? 
          
          <>
          <b className="product-stock_red">
            This item is currently out of stock
          </b>
          </>
          
          : 
          
          <>{product.stock<10 ? 
          
            <div className="product-stock">
                Hurry, Only a few <b className="greenColorfont">{product.name}</b> left!
            </div>
            
            : 
            
            <></>}</>}  
            <div className="product-head"> {product.name} </div>
            <div className="product-price"> Price - {product.price}₹</div>
            <div className="product-category">
              Category - {product.category}
            </div>
            <div className="product-minitext"> Colour - {product.colour}</div>
            <div className="product-minitext"> Size - {product.size}</div>
            <div className="product-minitext"> For - {product.gender}</div>
            <div className="product-minitext">
              {" "}
              Product Description - {product.description}
            </div>

            <div className="addcartgocartBTN">
            {product.stock===0  && cartBtn === "Add To Cart" ? 
              <>
                <button
                  disabled
                  className="btn-add-item_Cart"                  
                >
                  {cartBtn}
                </button>
              </>
  
            : 
  
              <>
                <button                
                  className="btn-add-item"
                  onClick={() => {
                    Protected_Route_Cart();
                    console.log("Clicked Cartbtn");
                  }}
                >
                  {cartBtn}
                </button>
                </>}
              <button
                className="btn-add-item_fav"
                onClick={() => {
                  Protected_Route_Fav();
                  console.log("Clicked Favbtn");
                }}
              >
                {favBtn}
              </button>
            </div>
          </div>
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
  } else if (product.category === "mobile") {
    return (
      <div>
        <ShowProductMobile />
      </div>
    );
  } else if (product.category === "laptop") {
    return (
      <div>
        <ShowProductLaptop />
      </div>
    );
  } else {
    return (
      <div>
        <ShowProductShoes />
      </div>
    );
  }
};

export default Product;