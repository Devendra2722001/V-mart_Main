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

  useEffect(() => {
    getProductsData();
  }, []);

  async function getProductsData() {
    const { data } = await axios.get("https://vmart-api.herokuapp.com/getProduct");
    //setProducts(data.products);
    console.log(data);

    let allproducts = data.products;     
      
        let mobileproducts = [];
          for (let i = 0; i < allproducts.length; i++) {
              if (allproducts[i].category ==="mobile") {
                mobileproducts.push(allproducts[i]);
              }
          }

          setProducts(mobileproducts)
          console.log(allproducts);
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
