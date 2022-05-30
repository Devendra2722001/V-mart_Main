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
  const [BtnColor1, setBtnColor1] = useState("filter_btn_off")
  const [BtnColor2, setBtnColor2] = useState("filter_btn_off")
  const [BtnColor3, setBtnColor3] = useState("filter_btn_off")
  const [BrandBtnColor1, setBrandBtnColor1] = useState("filter_btn_off")
  const [BrandBtnColor2, setBrandBtnColor2] = useState("filter_btn_off")
  const [BrandBtnColor3, setBrandBtnColor3] = useState("filter_btn_off")
  const [BrandBtnColor4, setBrandBtnColor4] = useState("filter_btn_off")

  useEffect(() => {
    window.scrollTo(0, 0);    
    getProducts();
  }, []);



  const getProducts = async () => {
    const response = await axios.get("https://vmart-api.herokuapp.com/getProduct");
    if (componentMounted) {
      setData((response.data.products).filter((x) => x.category ==="laptop"));
      setFilter((response.data.products).filter((x) => x.category ==="laptop"));
      setLoading(false);
      // setTimeout(() => {
      //   filterProduct();
      //   console.log("Data loaded");
      // }, 1);
    }

    return () => {
      componentMounted = false;
    };
  };


  const changeBtnColor1 = () =>{
    if(BtnColor1==="filter_btn_off"){
      setBtnColor1("filter_btn_on")
      setBtnColor2("filter_btn_off")
      setBtnColor3("filter_btn_off")
      setBrandBtnColor1("filter_btn_off")
      setBrandBtnColor2("filter_btn_off")
      setBrandBtnColor3("filter_btn_off")
      setBrandBtnColor4("filter_btn_off")
    }else{
      setBtnColor1("filter_btn_off")
      setFilter(data)
    }
  }

  const changeBtnColor2 = () =>{
    if(BtnColor2==="filter_btn_off"){
      setBtnColor2("filter_btn_on")
      setBtnColor1("filter_btn_off")
      setBtnColor3("filter_btn_off")
      setBrandBtnColor1("filter_btn_off")
      setBrandBtnColor2("filter_btn_off")
      setBrandBtnColor3("filter_btn_off")
      setBrandBtnColor4("filter_btn_off")
    }else{
      setBtnColor2("filter_btn_off")
      setFilter(data)
    }
  }

  const changeBtnColor3 = () =>{
    if(BtnColor3==="filter_btn_off"){
      setBtnColor3("filter_btn_on")
      setBtnColor1("filter_btn_off")
      setBtnColor2("filter_btn_off")
      setBrandBtnColor1("filter_btn_off")
      setBrandBtnColor2("filter_btn_off")
      setBrandBtnColor3("filter_btn_off")
      setBrandBtnColor4("filter_btn_off")
    }else{
      setBtnColor3("filter_btn_off")
      setFilter(data)
    }
  }

  const changeBrandBtnColor1 = () =>{
    if(BrandBtnColor1==="filter_btn_off"){
      setBrandBtnColor1("filter_btn_on")
      setBrandBtnColor2("filter_btn_off")
      setBrandBtnColor3("filter_btn_off")
      setBrandBtnColor4("filter_btn_off")
      setBtnColor1("filter_btn_off")
      setBtnColor2("filter_btn_off")
      setBtnColor3("filter_btn_off")

    }else{
      setBrandBtnColor1("filter_btn_off")
      setFilter(data)
    }
  }

  const changeBrandBtnColor2 = () =>{
    if(BrandBtnColor2==="filter_btn_off"){
      setBrandBtnColor2("filter_btn_on")
      setBrandBtnColor1("filter_btn_off")
      setBrandBtnColor3("filter_btn_off")
      setBrandBtnColor4("filter_btn_off")
      setBtnColor1("filter_btn_off")
      setBtnColor2("filter_btn_off")
      setBtnColor3("filter_btn_off")
    }else{
      setBrandBtnColor2("filter_btn_off")
      setFilter(data)
    }
  }

  const changeBrandBtnColor3 = () =>{
    if(BrandBtnColor3==="filter_btn_off"){
      setBrandBtnColor3("filter_btn_on")
      setBrandBtnColor2("filter_btn_off")
      setBrandBtnColor1("filter_btn_off")
      setBrandBtnColor4("filter_btn_off")
      setBtnColor1("filter_btn_off")
      setBtnColor2("filter_btn_off")
      setBtnColor3("filter_btn_off")
    }else{
      setBrandBtnColor3("filter_btn_off")
      setFilter(data)
    }
  }

  const changeBrandBtnColor4 = () =>{
    if(BrandBtnColor4==="filter_btn_off"){
      setBrandBtnColor4("filter_btn_on")
      setBrandBtnColor2("filter_btn_off")
      setBrandBtnColor3("filter_btn_off")
      setBrandBtnColor1("filter_btn_off")
      setBtnColor1("filter_btn_off")
      setBtnColor2("filter_btn_off")
      setBtnColor3("filter_btn_off")
    }else{
      setBrandBtnColor4("filter_btn_off")
      setFilter(data)
    }
  }

  const ResetAllcolor = () =>{
      setFilter(data)
      setBrandBtnColor4("filter_btn_off")
      setBrandBtnColor2("filter_btn_off")
      setBrandBtnColor3("filter_btn_off")
      setBrandBtnColor1("filter_btn_off")
      setBtnColor1("filter_btn_off")
      setBtnColor2("filter_btn_off")
      setBtnColor3("filter_btn_off")
  }

















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
    //document.getElementById("filter_btn_reset").click();
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
                    id={BtnColor1}                    
                    onClick={() => {filter1Product("8"); changeBtnColor1();}}
                  >
                    8 GB
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id={BtnColor2} 
                    onClick={() => {filter1Product("16"); changeBtnColor2();}}
                  >
                    16 GB
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id={BtnColor3} 
                    onClick={() => {filter1Product("32"); changeBtnColor3();}}
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
                    id={BrandBtnColor1} 
                    onClick={() => {filter2Product("HP"); changeBrandBtnColor1();}}
                  >
                    HP
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id={BrandBtnColor2} 
                    onClick={() => {filter2Product("Lenovo"); changeBrandBtnColor2();}}
                  >
                    Lenovo
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id={BrandBtnColor3}
                    onClick={() => {filter2Product("Apple"); changeBrandBtnColor3();}}
                  >
                    Apple
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-outline"
                    id={BrandBtnColor4}
                    onClick={() => {filter2Product("Dell"); changeBrandBtnColor4();}}
                  >
                    Dell
                  </button>
                </div>
              </div>

              <div>
                <button
                  className="btn btn-outline"
                  id="filter_btn_reset"
                  onClick={() => {ResetAllcolor();}}
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
