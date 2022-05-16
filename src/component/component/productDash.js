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
  }, []);

  async function getProductsData() {
    const { data } = await axios.get("http://localhost:8000/getProduct");
    setProducts(data.products);
  }

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:8000/deleteProduct/${id}`, {
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
