import Navbar from "../component/navbar";
import Main from "../component/mainForm";
import View from "../component/View";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function VendorDashbord() {
  const [products, setProducts] = useState([]);
  const [updateProducts, setUpdateProducts] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getProductsData();
    getProfile();
    getOrderhistory();
  }, []);

  const getProfile = async () => {
    await axios.get("https://vmart-api.herokuapp.com/myProfile", {
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    });    
  };

   const getOrderhistory = async () => {
      let data = await fetch("https://vmart-api.herokuapp.com/order", {
      method: "GET",
    });
    data = await data.json();
    console.log(data.length) 
    sessionStorage.setItem("MyOrder", data.length);
  }

  async function getProductsData() {
    const { data } = await axios.get("https://vmart-api.herokuapp.com/getProduct");
      

    let allproducts = data.products;
    let Zerostock = [];
    let vendorproduct = [];

    for (let i = 0; i < allproducts.length; i++) {
      if (allproducts[i].vendorId === localStorage.getItem("VendorId")) {
        vendorproduct.push(allproducts[i]);
      }
    }
    setProducts(vendorproduct);
    sessionStorage.setItem("Myproducts", vendorproduct.length)   

    for (let i = 0; i < vendorproduct.length; i++) {
      if (vendorproduct[i].stock === 0) {
        Zerostock.push(vendorproduct[i]);
      }
    }

    sessionStorage.setItem("OutOfStock", Zerostock.length)   
    console.log("Zerostock",Zerostock);
    
  }

  

  const deleteProduct = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then  (async(result) => {
      if (result.isConfirmed) {
        var res = await axios.delete(`https://vmart-api.herokuapp.com/deleteProduct/${id}`, {
        headers: { token: JSON.parse(localStorage.getItem("token")) },
        });
        //res = await res.data
        console.log(res);
        if(res.status === 200){
          getProductsData();
        }
      }
    })
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
