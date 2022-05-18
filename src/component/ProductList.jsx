import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CatNav from "./CatNav";
import Skeleton from "react-loading-skeleton";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(true);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://api.npoint.io/59a16051b5a480e975d9");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
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
            <Skeleton height={422} width={312}/>
        </div>
        <div>
            <Skeleton height={422} width={312}/>
        </div>
        <div>
            <Skeleton height={422} width={312}/>
        </div>
        <div>
            <Skeleton height={422} width={312}/>
        </div>
        <div>
            <Skeleton height={422} width={312}/>
        </div>
        <div>
            <Skeleton height={422} width={312}/>
        </div>
        <div>
            <Skeleton height={422} width={312}/>
        </div>
        <div>
            <Skeleton height={422} width={312}/>
        </div>
      </div>
    </>
    );
  };

  const ShowProducts = () => {
    return (

      <>
        <section className="wrapper">

          {filter.map((product) => {
            return (
              <>

                <div className="card-container" key={product.id}>
                  <NavLink to={`/products/${product.id}`} id="copyright">
                    <div className="card">
                      <img src={product.image} alt="images" className="card-media" />
                      <div className="card-text">
                        <div className="card-head"> {product.title} </div>
                        <div className="card-price">Price - {product.price} ₹</div>
                        <div className="lastrow">
                          <div className="card-category">Category - {product.category}</div>                          
                        </div>
                      </div>

                    </div>
                  </NavLink>
                </div>

              </>
            );
          })}
        </section>
      </>
    );
  };
  return (
    <div>
      <div>
        <div>
        <CatNav />
        {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
