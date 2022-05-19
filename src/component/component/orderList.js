import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Orderlist = () => {
  //const [orderHistory, setOrderHistory] = useState([]);
  //const [ordersList1, setOrderslist1] = useState({});
  const { id, key } = useParams();
  console.log(id);

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    getOrdersData();
  }, []);

  const getOrdersData = async () => {
    let result = await fetch(`http://localhost:8000/specificorder/${id}`, {
      method: "GET",
    });
    result = await result.json();
    console.log("hello123");

    setOrdersList(result);
  };

  //console.log(ordersList);
  // const getOrdersList = async () => {
  //   let result = await fetch(
  //     `http://localhost:8000/specificorder/${id}/${key}`,

  //     {
  //       method: "GET",
  //     }
  //   );
  //   result = await result.json();
  //   setOrderslist1(result);
  // // };

  // console.log(ordersList1);

  return (
    <>
      <div>
        <div>
          <br /> <br />
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
