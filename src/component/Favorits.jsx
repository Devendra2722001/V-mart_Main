import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import Empty from "./Empty.gif";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

const Favorits = () => {
  const history = useHistory();
  const [favourite, setFavourite] = useState([]);
  const [loading, setLoading] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
    getFavourite();    
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const LoginAlert = () => {
    swal({
      title: "Login/Signup!",
      text: "Please Login/Singup first to view your favorites",
      icon: "warning",
      button: "Okay!",
    });
    history.push("/login");
  };

  const getFavourite = async () => {
    if(token){
      await axios.get("http://localhost:8000/myfavouritetItem", {
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    })
      
    .then((res) => {
      console.log("response of favorite listiing" , res);
      if (res.status === 200){
        setFavourite(res.data); 
        setLoading(false);
      }
    })
    }else{
      LoginAlert();
    }
  };

  const removeFromgetFavourite = async (id) => {
    await axios.post(
      `http://localhost:8000/removeFromFavourite/${id}`,{},
      {
        headers: { token: JSON.parse(localStorage.getItem("token")) },
      }
    ).then((res) => {
      console.log("responce of remove from favorite", res);
      setFavourite(res.data);
    })
  };
  const Cartisempty = () => {
    return (
      <section className="cart-wrapper-empty">
        <div className="Empty-Cart">
          <img src={Empty} className="Empty-Cart-img" alt="Error-Img" />

          <div className="Empty-Text">
            <h2>Hey You Have nothing in your Favorites</h2>
            <NavLink to="/">
              <h6>Contine Shoping</h6>
            </NavLink>
          </div>
        </div>
      </section>
    );
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

  console.log(favourite);

 

  const ShowProducts = () => {
    return (
      <>
        <section className="fav-wrapper">
          {favourite.map((favObj) => (
            <div className="cart-card-container" key={favObj.productId}>
              <div>
                <div className="cart-card">
                  <NavLink
                    to={`/productlist/${favObj.productId}`}
                    id="copyright"
                  >
                    <img
                      src={favObj.productImageurl1}
                      alt="images"
                      className="cart-card-media"
                    />
                  </NavLink>
                  <div className="cart-card-text">
                    <NavLink
                      to={`/productlist/${favObj.productId}`}
                      id="copyright"
                    >
                      <div className="cart-card-head">{favObj.productName}</div>
                    </NavLink>
                    <div className="cart-card-price">
                      <NavLink
                        to={`/productlist/${favObj.productId}`}
                        id="copyright"
                      >
                        Price - {favObj.productPrice}₹
                      </NavLink>
                    </div>
                    <div className="cart-lastrow">
                      <NavLink
                        to={`/productlist/${favObj.productId}`}
                        id="copyright"
                      >
                        <div className="cart-card-category">
                          Category - {favObj.productCategory}
                        </div>
                      </NavLink>
                    </div>
                    <br></br>
                    <div className="plus-minus">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromgetFavourite(favObj.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <div className="btn btn-danger mb-5 w-25 mx-auto" onClick={()=>{history.go(-1)}}>
          Cancel
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
  } else if (favourite.length === 0) {
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

export default Favorits;
