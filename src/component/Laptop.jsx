import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CatNav from "./CatNav";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

const Laptop = () => {
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
                    id="filter_btn_first"
                    onClick={() => filter1Product("8GB")}
                  >
                    8 GB
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn"
                    onClick={() => filter1Product("16GB")}
                  >
                    16 GB
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn"
                    onClick={() => filter1Product("32GB")}
                  >
                    32 GB
                  </button>
                </div>
              </div>

              <div className="Filter_Card">
                <div className="card-price">Filter By Brand</div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn_first"
                    onClick={() => filter2Product("Apple_L")}
                  >
                    Apple
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn"
                    onClick={() => filter2Product("Rog")}
                  >
                    Rog
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn"
                    onClick={() => filter2Product("Hp")}
                  >
                    Hp
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id="filter_btn"
                    onClick={() => filter2Product("Msi")}
                  >
                    Msi
                  </button>
                </div>
              </div>

              <div>
                <button
                  className="btn btn-outline"
                  id="filter_btn_reset"
                  onClick={() => filterProduct("laptop")}
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
                  <div className="card-container" key={product.id}>
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

export default Laptop;
