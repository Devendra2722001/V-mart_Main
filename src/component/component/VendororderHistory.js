import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const VendororderHistory = () => {
  const [Orderhistory, setOrderhistory] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getOrderhistory();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const getOrderhistory = async () => {
      let res = await axios.get("https://vmart-api.herokuapp.com/order", {
    });
    res = res.data;
    console.log(res);
    setOrderhistory(res);  
  }

  console.log("orderHistory" ,Orderhistory)
  sessionStorage.setItem("MyOrder", Orderhistory.length);

  return (
    <>
      <div>
        <div className="container-scroller">
          <br /> <br />
          <br></br>
          <button
            type="button"
            className="btn btn-danger btn-lg"
            id="login_btn-style"
            onClick={() => {
              history.go(-1)
            }}
          >
            Cancel
          </button>
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
                          if (
                            products.productVendorId ===
                            localStorage.getItem("VendorId")
                          ) {
                            return (
                              <tr>
                                <td>
                                  {orderDetail?.firstName}{" "}
                                  {orderDetail?.lastName}
                                </td>
                                <td>{products?.productName}</td>
                                <td>₹ {products?.productPrice}/-</td>
                                <td>{products?.productCategory}</td>
                                <td>Location : {address?.addressLine1}<br></br>
                                    City : {address?.cityName}, 
                                    District :  {address?.district}<br></br>
                                    Pincode : {address?.zipCode}<br></br>
                                    Type : {address?.addressLine2}
                                </td>
                                <td>{orderDetail?.created_at}</td>
                              </tr>
                            )
                          }else{
                            return null;
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
};

export default VendororderHistory;
