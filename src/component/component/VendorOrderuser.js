import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const VendorOrderuser = () => {
  const [ordersList, setOrders] = useState([]);

  useEffect(() => {
    getOrdersData();
  }, []);

  const getOrdersData = async () => {
    let result = await axios.get(`http://localhost:8000/order`, {
    });
    result = result.data
    setOrders(result);
  };

  return (
    <>
      <div className="admin-card-wraper">
        {ordersList.map((order) => {         
          return (
            <div className="cart-card-container" key={order._id}>
              <div>
                <div className="cart-card">
                  <div className="cart-card-text">
                    <div className="cart-card-category">
                      FirstName -{" "}
                      <b className="admin-card-head">{order.firstName}</b>
                    </div>
                    <div className="cart-card-category">
                      LastName -{" "}
                      <b className="admin-card-head">{order.lastName}</b>
                    </div>

                    <div className="cart-lastrow mb-2">
                      <div className="cart-card-category">
                        Email - {order.email}
                      </div>
                    </div>
                    <Link
                      id="noUnderline"
                      to={`/order/${order.userId}`}
                    >
                      <button type="button" className="btn btn-primary">
                        View orders
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )       
        })}
      </div>
    </>
  );
};
export default VendorOrderuser;
