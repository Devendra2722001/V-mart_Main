import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

const HomeProductList = () => {
  const [data, setData] = useState([]);
  let componentMounted = true;
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProducts = async () => {
      const response = await axios.get("https://vmart-api.herokuapp.com/getProduct");
      //const response = await fetch(`https://vmart-api.herokuapp.com/getProduct`);
      if (componentMounted) {
        setData(response.data.products);
        setLoading(false);
        //console.log(data);
        //console.log(response.data.products);
      }

      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  let allproducts = data;

  //console.log(data);

  let mobileproducts = [];
  for (let i = 0; i < allproducts.length; i++) {
    if (allproducts[i].category === "mobile") {
      mobileproducts.push(allproducts[i]);
    }
  }
  let fourmobile = mobileproducts.slice(0, 4);
  //console.log("mobileproducts",fourmobile);

  let laptopproducts = [];
  for (let i = 0; i < allproducts.length; i++) {
    if (allproducts[i].category === "laptop") {
      laptopproducts.push(allproducts[i]);
    }
  }
  let fourlaptop = laptopproducts.slice(0, 4);
  //console.log("laptopproducts",fourlaptop);

  let shoesproducts = [];
  for (let i = 0; i < allproducts.length; i++) {
    if (allproducts[i].category === "shoes") {
      shoesproducts.push(allproducts[i]);
    }
  }
  let fourshoes = shoesproducts.slice(0, 4);
  //console.log("shoesproducts",fourshoes);
  console.log(allproducts);

  const ShowProducts = () => {
    return (
      <>
        <div className="Mobile-list-Line">
          <div className="Mobile-list-Line-text">
            <div className="Mobile-list-Line-cat">Mobile</div>
            <div className="Mobile-list-Line-Viewall">
              <NavLink to={`/mobile`} id="copyright">
                View All
              </NavLink>
            </div>
          </div>
          <section className="mini-wrapper">
            {fourmobile.map((product) => (
              
                <>
                  <div className="card-container" key={product._id}>
                    <Link to={`/productlist/${product._id}`} id="copyright">
                      <div className="card_All">
                        <img
                          src={product.imageurl1}
                          onError={(event) => {
                            event.target.src =
                              "https://res.cloudinary.com/volansys/image/upload/v1650948247/images/1000_F_441129176_ifK3aSVPLlSM4kDe93SlaEACpBNZQOtg_zu4bdb.jpg";
                            event.onerror = null;
                          }}
                          alt="images"
                          className="card-media"
                        />
                        <div className="card-text">
                          <div className="card-head"> {product.name} </div>
                          <div className="card-price">
                            Price - {product.price}₹
                          </div>
                          <div className="lastrow">
                            <div className="card-category">
                              Category - {product.category}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              )
            )}
          </section>
        </div>

        <hr className="my-4" />

        <div className="Mobile-list-Line">
          <div className="Mobile-list-Line-text">
            <div className="Mobile-list-Line-cat">Laptop</div>
            <div className="Mobile-list-Line-Viewall">
              <NavLink to={`/laptop`} id="copyright">
                View All
              </NavLink>
            </div>
          </div>
          <section className="mini-wrapper">
            {fourlaptop.map((product) => (
                <>
                  <div className="card-container" key={product._id}>
                    <Link to={`/productlist/${product._id}`} id="copyright">
                      <div className="card_All">
                        <img
                          src={product.imageurl1}
                          onError={(event) => {
                            event.target.src =
                              "https://res.cloudinary.com/volansys/image/upload/v1650948247/images/1000_F_441129176_ifK3aSVPLlSM4kDe93SlaEACpBNZQOtg_zu4bdb.jpg";
                            event.onerror = null;
                          }}
                          alt="images"
                          className="card-media"
                        />
                        <div className="card-text">
                          <div className="card-head"> {product.name} </div>
                          <div className="card-price">
                            Price - {product.price}₹
                          </div>
                          <div className="lastrow">
                            <div className="card-category">
                              Category - {product.category}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
            ))}
          </section>
        </div>

        <hr className="my-4" />

        <div className="Mobile-list-Line">
          <div className="Mobile-list-Line-text">
            <div className="Mobile-list-Line-cat">Shoes</div>
            <div className="Mobile-list-Line-Viewall">
              <NavLink to={`/shoes`} id="copyright">
                View All
              </NavLink>
            </div>
          </div>
          <section className="mini-wrapper">
            {fourshoes.map((product) => (
                <>
                  <div className="card-container" key={product._id}>
                    <Link to={`/productlist/${product._id}`} id="copyright">
                      <div className="card_All">
                        <img
                          src={product.imageurl1}
                          onError={(event) => {
                            event.target.src =
                              "https://res.cloudinary.com/volansys/image/upload/v1650948247/images/1000_F_441129176_ifK3aSVPLlSM4kDe93SlaEACpBNZQOtg_zu4bdb.jpg";
                            event.onerror = null;
                          }}
                          alt="images"
                          className="card-media"
                        />
                        <div className="card-text">
                          <div className="card-head"> {product.name} </div>
                          <div className="card-price">
                            Price - {product.price}₹
                          </div>
                          <div className="lastrow">
                            <div className="card-category">
                              Category - {product.category}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
            ))}
          </section>
        </div>
      </>
    );
  };

  const Loading = () => {
    return (
      <>
        <div className="loading_screen">
          <div>
            <Skeleton height={422} width={312} />
          </div>
          <div>
            <Skeleton height={422} width={312} />
          </div>
          <div>
            <Skeleton height={422} width={312} />
          </div>
          <div>
            <Skeleton height={422} width={312} />
          </div>
        </div>
      </>
    );
  };

  return <div>{loading ? <Loading /> : <ShowProducts />}</div>;
};

export default HomeProductList;
