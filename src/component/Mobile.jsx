import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CatNav from "./CatNav";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

const Mobile = () => {
  let [data, setData] = useState([]);
  let [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  let newData = [];
  let bothData = [];
  let popedData = [];
  
  

  let componentMounted = true;

  useEffect(() => {    
    getProducts();
  }, []);

  //console.log("products",products);

  const getProducts = async () => {
    const response = await axios.get("https://vmart-api.herokuapp.com/getProduct");
    if (componentMounted) {
      console.log("Response - ",response.data.products);
      setProducts((response.data.products).filter((x) => x.category ==="mobile"));
      setData((response.data.products).filter((x) => x.category ==="mobile"));      
      setLoading(false);      
    }

    return () => {
      componentMounted = false;
    };
  };

  let MyData8 = products.filter((x) => x.RAM === "8");    
  console.log(MyData8);

  let MyData4 = products.filter((x) => x.RAM === "4"); 
  console.log(MyData4);


  const handleOnChange = () => {    

    if(isChecked === false && isChecked1 === false){
      setIsChecked(true)
      setData(MyData4)
    }else if(isChecked === false && isChecked1 === true){
      setIsChecked(true)
      let bothData = [];
      for (let i = 0; i < MyData8.length; i++) {       
          bothData.push(MyData8[i]);
          console.log("bothData",bothData);
      }
      for (let i = 0; i < MyData4.length; i++) {
          bothData.push(MyData4[i]);
          console.log("bothData",bothData);
      }     
      setData(bothData)
    }else if(isChecked === true && isChecked1 === true){
      setIsChecked(false)
      setData(MyData8)
    }else if(isChecked === true && isChecked1 === false){
      setIsChecked(false)
      setData(products)
    }
  }; 

  const handleOnChange1 = () => {    

    if(isChecked1 === false && isChecked === false){
      setIsChecked1(true)
      setData(MyData8)
    }else if(isChecked1 === false && isChecked === true){
      setIsChecked1(true) 
      let bothData = [];
      for (let i = 0; i < MyData8.length; i++) {       
          bothData.push(MyData8[i]);
          console.log("bothData",bothData);
      }
      for (let i = 0; i < MyData4.length; i++) {
          bothData.push(MyData4[i]);
          console.log("bothData",bothData);
      }     
      setData(bothData)
    }else if(isChecked1 === true && isChecked === true){
      setIsChecked1(false)
      setData(MyData4)
    }else if(isChecked1 === true && isChecked === false){
      setIsChecked1(false)
      setData(products)
    }
    
  }; 


      // if(isChecked===false){
      //   setIsChecked(true);
      //   for (let i = 0; i < products.length; i++) {
      //     if (products[i].RAM === "4") {
      //       popedData.push(products[i]);
      //     }
      //   }
      //   setData(popedData)
      // }else{

      //   setIsChecked(false);
        // for (let i = 0; i < products.length; i++) {
        //   if (products[i].RAM !== "4") {
        //     data.push(products[i]);
        //   }
        // }
        // setData(products)
        //console.log("popedData",popedData);
    // }



//  const handleOnChange1 = () => {      
 




//   };


     // if(isChecked1===false){
    //   setIsChecked1(true);
    //   for (let i = 0; i < products.length; i++) {
    //     if (products[i].RAM === "8") {
    //       popedData.push(products[i]);
    //     }
    //   }
    //   setData(popedData)
    // }else{

    //   setIsChecked1(false);
      // for (let i = 0; i < products.length; i++) {
      //   if (products[i].RAM !== "8") {
      //     popedData.push(products[i]);
      //   }
      // }
      // setData(products)
      //console.log("popedData",popedData);
  // }
  

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
  

  const ShowProducts = () => {
    return (
      <>
        <div className="Main-mobile">          
            <div className="Filters">         
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={isChecked} onChange={handleOnChange}/>
                      <label className="form-check-label" for="flexCheckDefault">
                        4 GB
                      </label>
                    </div>

                  <br/>
                
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={isChecked1} onChange={handleOnChange1}/>
                      <label className="form-check-label" for="flexCheckDefault">
                        8 GB
                      </label>
                    </div>
        </div>
          <section className="mobile-wrapper" id="mobile-main">
            {data.map((product) => {
              return (
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
