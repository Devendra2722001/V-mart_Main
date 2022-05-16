import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CatNav from "./CatNav";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

const Mobile = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(true);

  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("https://vmart-api.herokuapp.com/getProduct");
      if (componentMounted) {
        setData(response.data.products);
        setFilter(response.data.products);
        setLoading(false);
        setTimeout(() => {
          filterProduct();
          console.log("Data loaded");
        }, 1);
      }

      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

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

  const filterProduct = (c) => {
    const updatedList = data.filter((x) => x.category === c);
    setFilter(updatedList);
    document.getElementById("filter_btn_reset").click();
  };

  const filter1Product = (r) => {
    const updatedList = data.filter((x) => x.RAM === r);
    setFilter(updatedList);
  };

  const filter2Product = (b) => {
    const updatedList = data.filter((x) => x.brand === b);
    setFilter(updatedList);
  };

  //console.log("All Data" ,data);
  //const FRUITS = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
  //var citrus = filter.slice(0, 2);

  //console.log("Sliced Data" ,citrus);

  // let cities = [
  //   {name: 'Los Angeles', population: 3792621},
  //   {name: 'New York', population: 8175133},
  //   {name: 'Chicago', population: 2695598},
  //   {name: 'Houston', population: 2099451},
  //   {name: 'Philadelphia', population: 1526006}
  //   ];

  //   let bigCities = [];
  //     for (let i = 0; i < cities.length; i++) {
  //         if (cities[i].name ==='Chicago') {
  //             bigCities.push(cities[i]);

  //         }
  //     }
  //     console.log(bigCities);
  //     console.log(cities);

  // let allproducts = data;
  // console.log(data);

  //   let mobileproducts = [];
  //     for (let i = 0; i < allproducts.length; i++) {
  //         if (allproducts[i].category ==="mobile") {
  //           mobileproducts.push(allproducts[i]);
  //         }
  //     }
  //     mobileproducts = filter.slice(0, 3);
  //   console.log("Sliced Data",mobileproducts);
  //   //console.log(allproducts);

  const ShowProducts = () => {
    return (
      <>
        <div className="Main-mobile">
          <div>
            <div className="Filters">
              <div className="Filter_Card" id="Filter_Card_first">
                <div className="card-price">Filter By Ram</div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn"
                    onClick={() => filter1Product("4")}
                  >
                    4 GB
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn"
                    onClick={() => filter1Product("6")}
                  >
                    6 GB
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn"
                    onClick={() => filter1Product("8")}
                  >
                    8 GB
                  </button>
                </div>
              </div>

              <div className="Filter_Card">
                <div className="card-price">Filter By Brand</div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn_first"
                    onClick={() => filter2Product("Oppo")}
                  >
                    Oppo
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn"
                    onClick={() => filter2Product("Iphone")}
                  >
                    Iphone
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn"
                    onClick={() => filter2Product("Samsung")}
                  >
                    Samsung
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn"
                    onClick={() => filter2Product("Google")}
                  >
                    Google
                  </button>
                </div>
              </div>

              <div>
                <button
                  className="btn btn-outline"
                  id="filter_btn_reset"
                  onClick={() => filterProduct("mobile")}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <section className="mobile-wrapper" id="mobile-main">
            {filter.map((product) => {
              return (
                <>
                  <div className="card-container" key={product._id}>
                    <Link to={`/productlist/${product._id}`} id="copyright">
                      <div className="card_All">
                        <img
                          src={product.imageurl}
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
                          <div class="lastrow">
                            <div className="card-category">
                              Category - {product.category}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })}
          </section>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="">
        <div className="">
          <CatNav />
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Mobile;
