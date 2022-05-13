import Navbar from "../component/navbar";
import Main from "../component/mainForm";
import View from "../component/View";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

//window.alert("Welcome to Admin Panel....");

function VendorDashbord() {
  const [products, setProducts] = useState([]);
  const [updateProducts, setUpdateProducts] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [profile , setProfile] = useState([]);
  const [vid , setVid] = useState("")

  useEffect(() => {
    getProductsData();
    getProfile();
    
    //setVid(localStorage.getItem("token"))
    //console.log(vid);
    //console.log(localStorage.getItem("token"));
  }, []);

  console.log(profile._id);

  const getProfile = async() => {
    let result = await fetch("https://vmart-api.herokuapp.com/myProfile",{
        method: "GET",
        headers :{ token : JSON.parse(localStorage.getItem("token"))
        }
    });
    result = await result.json();
    setProfile(result);
    setVid(result._id)

  }

  console.log(vid)

  async function getProductsData() {
    const { data } = await axios.get("https://vmart-api.herokuapp.com/getProduct");
    //setProducts(data.products);
    console.log(data);

        let allproducts = data.products;     
      
        let vendorproduct = [];
          for (let i = 0; i < allproducts.length; i++) {
              if (allproducts[i].vendorId === localStorage.getItem("VendorId")) {
                vendorproduct.push(allproducts[i]);
              }
          }
          setProducts(vendorproduct)
          // setInterval(() => {
          //   
          // }, 1000);
          

          
          

          //console.log(allproducts);
        //let fourmobile = mobileproducts.slice(0, 4); 
  }

  const deleteProduct = async (id) => {
    let result = await fetch(`https://vmart-api.herokuapp.com/deleteProduct/${id}`, {
      method: "Delete",
    });
    result = await result.json;
    if (result) {
      toast("Record is deleted");
      getProductsData();
    }
  };

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

export default VendorDashbord;
