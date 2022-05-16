import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { NavLink, useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import swal from "sweetalert";

toast.configure();
const Product = () => {
  const history = useHistory();
  const { _id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartBtn, setCartBtn] = useState("Add To Cart");
  const [favBtn, setFavBtn] = useState("Add To Favorites");
  const [cartItem, setCartItem] = useState([]);

  const addFavorit = (favorit) => {
    if (favBtn === "Add To Favorites") {
      setFavBtn("Remove From Favorites");
    } else {
      setFavBtn("Add To Favorites");
    }
  };

  useEffect(() => {
    getProduct();
    Checkforcart();
    Checkforfav();
  }, []);

  const Checkforcart = async () => {
    let result = await fetch("https://vmart-api.herokuapp.com/myCartItem", {
      method: "GET",
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    //console.log("got cart data:-",result);
    //setCartItem(result);

    for (let i = 0; i < result.length; i++) {
      let item_ids = result[i].productId;
      if (item_ids === _id) {
        setCartBtn("Remove From Cart");
      } else {
        setCartBtn("Add To Cart");
      }
    }
  };

  const Checkforfav = async () => {
    let Favresult = await fetch("https://vmart-api.herokuapp.com/myfavouritetItem", {
      method: "GET",
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    Favresult = await Favresult.json();
    console.log("got Fav data:-", Favresult);
    //setCartItem(Favresult);

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
    const response = await fetch(`https://vmart-api.herokuapp.com/singleProduct/${_id}`);
    setProduct(await response.json());
    setLoading(false);
  };

  const addToCart = async (_id) => {
    let result = await fetch(`https://vmart-api.herokuapp.com/cart/${_id}`, {
      method: "POST",
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    //setCartItem(result);
    toast(`${product.name} Added To cart`, {
      position: toast.POSITION.TOP_LEFT,
    });
    //setCartBtn("Remove From Cart")
  };

  const addTofav = async (_id) => {
    let Favresult = await fetch(`https://vmart-api.herokuapp.com/favourite/${_id}`, {
      method: "POST",
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    Favresult = await Favresult.json();
    toast(`${product.name} Added To Favorites`, {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const removeFromCart = async (_id) => {
    let result = await fetch(`https://vmart-api.herokuapp.com/removeFromCart/${_id}`, {
      method: "POST",
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    //setCartItem(result);
    toast(`${product.name} Removed From Cart`, {
      position: toast.POSITION.TOP_LEFT,
    });
    //window.location.reload();
  };

  const removeFromfav = async (_id) => {
    let Favresult = await fetch(
      `https://vmart-api.herokuapp.com/removeFromFavourite/${_id}`,
      {
        method: "POST",
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    Favresult = await Favresult.json();
    //setCartItem(result);
    toast(`${product.name} Removed From Favorites`, {
      position: toast.POSITION.TOP_LEFT,
    });
    //window.location.reload();
  };

  const dothething = () => {
    //console.log("call donothing",cartBtn,typeof(cartBtn));
    if (cartBtn === "Add To Cart") {
      console.log("---->");
      tryingToadd(product._id);
    } else {
      tryingToremove(product._id);
    }
  };

  const dothethingforfav = () => {
    //console.log("call donothing",cartBtn,typeof(cartBtn));
    if (favBtn === "Add To Favorites") {
      //console.log("---->")
      tryingToaddfav(product._id);
    } else {
      tryingToremovefav(product._id);
    }
  };

  const tryingToadd = (_id) => {
    //console.log(_id)
    //console.log("call donothing",cartBtn,typeof(cartBtn));

    if (cartBtn === "Add To Cart") {
      addToCart(_id);
      setCartBtn("Remove From Cart");
      //changeBtn()
    } else {
      //setCartBtn("Add To Cart")
    }
  };

  const tryingToremove = (_id) => {
    if (cartBtn === "Remove From Cart") {
      console.log("Trying To Remove from cart");
      removeFromCart(_id);
      setCartBtn("Add To Cart");
      //changeBtn();
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
      //changeBtn();
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
    swal({
      title: "Login/Signup!",
      text: "Please Login Or Singup to add item to your cart",
      icon: "warning",
      button: "Okay!",
    });
    //history.push("/login");
  };

  const CongoAlertFav = () => {
    swal({
      title: "Login/Signup!",
      text: "Please Login Or Singup to add item to your favorites",
      icon: "warning",
      button: "Okay!",
    });
    //history.push("/login");
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
                  src={product.imageurl}
                  alt={product.name}
                />
              </div>
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageurl}
                  alt={product.name}
                />
              </div>
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageurl}
                  alt={product.name}
                />
              </div>
            </div>
            <div className="product-media">
              <img
                className="product_img"
                src={product.imageurl}
                alt={product.name}
              />
            </div>
          </div>

          <div id="grid_2">
            <div className="product-head"> {product.name} </div>
            <div className="product-price"> Price - {product.price}₹</div>
            <div className="product-category">
              Category - {product.category}
            </div>
            <div className="product-minitext">Ram - {product.RAM}GB</div>
            <div className="product-minitext">
              {" "}
              Screen Size - {product.screenSize}
            </div>
            <div className="product-minitext">
              {" "}
              Main Camera - {product.camera}
            </div>
            <div className="product-minitext">
              {" "}
              Product Description - {product.description}
            </div>

            <div className="addcartgocartBTN">
              <button
                className="btn-add-item"
                onClick={() => {
                  Protected_Route_Cart();
                  console.log("Clicked Cartbtn");
                }}
              >
                {cartBtn}
              </button>

              <button
                className="btn-add-item"
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
                  src={product.imageurl}
                  alt={product.name}
                />
              </div>
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageurl}
                  alt={product.name}
                />
              </div>
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageurl}
                  alt={product.name}
                />
              </div>
            </div>
            <div className="product-media">
              <img
                className="product_img"
                src={product.imageurl}
                alt={product.name}
              />
            </div>
          </div>

          <div id="grid_2">
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
              <button
                className="btn-add-item"
                onClick={() => {
                  Protected_Route_Cart();
                  console.log("Clicked Cartbtn");
                }}
              >
                {cartBtn}
              </button>

              <button
                className="btn-add-item"
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
                  src={product.imageurl}
                  alt={product.name}
                />
              </div>
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageurl}
                  alt={product.name}
                />
              </div>
              <div>
                <img
                  className="product-media-mini"
                  src={product.imageurl}
                  alt={product.name}
                />
              </div>
            </div>
            <div className="product-media">
              <img
                className="product_img"
                src={product.imageurl}
                alt={product.name}
              />
            </div>
          </div>

          <div id="grid_2">
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
              <button
                className="btn-add-item"
                onClick={() => {
                  Protected_Route_Cart();
                  console.log("Clicked Cartbtn");
                }}
              >
                {cartBtn}
              </button>

              <button
                className="btn-add-item"
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
