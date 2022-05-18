import Navbar from "../component/navbar";
import Main from "../component/mainForm";
import View from "../component/View";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

//window.alert("Welcome to Admin Panel....");

function VendororderHistory() {
  const [Orderhistory, sethistory] = useState([]);
  // const [updateProducts, setUpdateProducts] = useState("");
  // const [showForm, setShowForm] = useState(false);
 
  useEffect(() => {
    getOrderhistory();
    // getProfile();    
  }, []);

  


  const getOrderhistory = async () => {
    let hi = await axios.get("http://localhost:8000/order");
    sethistory(hi.data);    
    //console.log(data);

    //const listofdata = await data.JSON();
    // let allorder = data.products;

    // let vendororder = [];
    // for (let i = 0; i < allorder.length; i++) {
    //   if (allorder[i].vendorId === localStorage.getItem("VendorId")) {
    //     vendororder.push(allorder[i]);
    //   }
    // }
    //console.log(vendororder)
      
    //console.log("data.data.orderDetail",data.data.orderDetail);
  }

  console.log("Orderhistory",Orderhistory);

  return (
    <>
      <div>
        <br/>
        <br/>
        <br/>        
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper table-responsive ">
            <div className="table-responsive tbl ">
            <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Product_Name</th>
                    <th>Product_Price</th>
                    <th>Product_Qty</th>
                    <th>Paymentmethod</th>
                    <th>AddressLine1</th>
                    <th>AddressLine2</th>
                    <th>CityName</th>
                    <th>ZipCode</th>
                    <th>createdAt</th>
                  </tr>
                </thead>
                <tbody>
                  {Orderhistory.map((ordersList) => {
                    return ordersList.products.map((products) => {
                      return ordersList.address.map((address) => {
                        return (
                          <tr>
                            <td>{products?.productName}</td>
                            <td>{products?.productPrice}</td>
                            <td>{products?.quantity}</td>
                            <td>{ordersList?.paymentMethod}</td>
                            <td>{address?.addressLine1}</td>
                            <td>{address?.addressLine2}</td>
                            <td>{address?.cityName}</td>
                            <td>{address?.zipCode}</td>
                            <td>{ordersList?.created_at}</td>
                          </tr>
                        );
                      });
                    });
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


{/* 
          
//return Orderhistory.orderDetail.products.map((products) => {                       */}
                          {/* // <tr>
                          //   <td>{list._id}</td>
                          //   {/* <td>{products?.productPrice}</td>
                          //   <td>{products?.quantity}</td>
                          //   <td>{Orderhistory?.paymentMethod}</td>
                          //   <td>{address?.addressLine1}</td>
                          //   <td>{address?.addressLine2}</td>
                          //   <td>{address?.cityName}</td>
                          //   <td>{address?.zipCode}</td>
                          //   <td>{Orderhistory?.created_at}</td> */}
                          {/* // </tr>
                    //}); */}



                  