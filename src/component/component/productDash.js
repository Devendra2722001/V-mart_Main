import Navbar from "../component/navbar";
import Main from "../component/mainForm";
import View from "../component/View";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

//window.alert("Welcome to Admin Panel....");

function Dashbord() {
  const [products, setProducts] = useState([]);
  const [updateProducts, setUpdateProducts] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getProductsData(); 
    getOrderhistory()   
  }, []);

  async function getProductsData() {
    const { data } = await axios.get("https://vmart-api.herokuapp.com/getProduct");
    setProducts(data.products);
    console.log("Got Data");
    sessionStorage.setItem("Myproducts", data.products.length);
  }

  const getOrderhistory = async () => {
    let data = await fetch("https://vmart-api.herokuapp.com/order", {
    method: "GET",
  });
  data = await data.json();
  console.log(data.length);    
  sessionStorage.setItem("MyOrder", data.length);
}

  const deleteProduct = async (id) => {
    let result = await fetch(`https://vmart-api.herokuapp.com/deleteProduct/${id}`, {
      method: "DELETE",
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });
    console.log(result);
    //result = await result.json;
    if (result.status === 200) {
      toast("Record is deleted");
      getProductsData();
    }
  };

  
    let Zerostock = [];

    for (let i = 0; i < products.length; i++) {
      if (products[i].stock === 0) {
        Zerostock.push(products[i]);
      }
    }

    sessionStorage.setItem("OutOfStock", Zerostock.length);  
    console.log("Zerostock",Zerostock);

  return (
    <>
      {showForm ? (
        <div>
          <Main
            setShowForm={setShowForm}
            getProductsData={getProductsData}
            deleteProduct={deleteProduct}
            updateProducts={updateProducts}
            setUpdateProducts={setUpdateProducts}
          />
        </div>
      ) : (
        <div>
          <Navbar
            setShowForm={setShowForm}
            setUpdateProducts={setUpdateProducts}
          />
          <View
            setShowForm={setShowForm}
            products={products}
            getProductsData={getProductsData}
            deleteProduct={deleteProduct}
            setUpdateProducts={setUpdateProducts}
          />         
        </div>
      )}
    </>
  );
}

export default Dashbord;
