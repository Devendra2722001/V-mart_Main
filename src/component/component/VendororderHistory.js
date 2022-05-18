import Navbar from "../component/navbar";
import Main from "../component/mainForm";
import View from "../component/View";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

//window.alert("Welcome to Admin Panel....");

const  VendororderHistory = () => {

  const [Orderhistory, setOrderhistory] = useState([]);

  useEffect(() => {
    getOrderhistory();
  }, []);


    const getOrderhistory = async () => {
      let data = await fetch("http://localhost:8000/order", {
      method: "GET",
    });
    data = await data.json();
    console.log(data);
    setOrderhistory(data);  
  }

  console.log("orderHistory" ,Orderhistory)
  //console.log("orderHistory orderDetail" ,Orderhistory.orderDetail)

  // let allproducts = Orderhistory;

  // let venderOrder = [];
  // for (let i = 0; i < Orderhistory.length; i++) {
  //   //if (Orderhistory[i].category === "mobile") {
  //     mobileproducts.push(allproducts[i].orderDetail);
  //   //}
  // }
  // //let fourmobile = mobileproducts.slice(0, 4);
  // console.log("mobileproducts",mobileproducts);

  // let listorder = [];

  // for (let i = 0; i < mobileproducts.length; i++) {
  //   //if (allproducts[i].category === "mobile") {
  //     listorder.push(mobileproducts[i].products);
  //   //}
  // }

  // console.log("listorder",listorder);



  

  return (
    <>
      <div>
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper table-responsive ">
            <div className="table-responsive tbl ">
              <br></br>
              <br></br>
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Customer name</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Category</th>
                    <th>Shipping Address</th>
                    <th>Order On</th>
                  </tr>
                </thead>
                <tbody>
                  {Orderhistory.map((Orderhistory) => {
                   return Orderhistory.orderDetail?.map((orderDetail) => {
                      return orderDetail?.products?.map((products) => {
                        return orderDetail?.address?.map((address) => {
                          if(products.productVendorId === localStorage.getItem("VendorId")){
                            return(
                              <tr>
                                <td>{orderDetail?.firstName} {orderDetail?.lastName}</td>
                                <td>{products?.productName}</td>
                                <td>₹ {products?.productPrice}/-</td>
                                <td>{products?.productCategory}</td>
                                <td>Location : {address?.addressLine1}<br></br>
                                    City : {address?.cityName}, District :  {address?.district}<br></br>
                                    Pincode : {address?.zipCode}<br></br>
                                    Type : {address?.addressLine2}
                                </td>
                                <td>{orderDetail?.created_at}</td>
                              </tr>
                            )
                          }
                          
                        })
                      })
                    })



                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendororderHistory;
