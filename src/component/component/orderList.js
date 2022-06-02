import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Orderlist = () => {
  const { id } = useParams();
  const history = useHistory();
  console.log(id);

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    getOrdersData();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const getOrdersData = async () => {
    let result = await axios.get(`http://localhost:8000/order/${id}`, {
    });
    result = result.data;
    setOrdersList(result);
  };

  return (
    <>
      <div>
        <div>
          <br /> <br />
          <br></br>
          <button
            type="button"
            className="btn btn-danger btn-lg"
            id="login_btn-style"
            onClick={()=>{history.go(-1)}}
          >
            Cancel
          </button>
          <div className="container-fluid page-body-wrapper table-responsive">
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
                  {ordersList.map((ordersList) => {
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
};
export default Orderlist;
