import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const VendorOrderist = () => {
  const [ordersList, setOrders] = useState([]);

  useEffect(() => {
    getOrdersData();
  }, []);

  const getOrdersData = async () => {
    let result = await fetch(`https://vmart-api.herokuapp.com/order`, {
      method: "GET",
    });
    result = await result.json();
    setOrders(result);
  };

  console.log(ordersList);

  return (
    <>
      <div class="admin-card-wraper">
        {ordersList.map((order) => {
          {
            /* return order.orderDetail.map((orderDetail) => { */
          }
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

                    <div class="cart-lastrow mb-2">
                      <div className="cart-card-category">
                        Email - {order.email}
                      </div>
                    </div>
                    <Link
                      id="noUnderline"
                      to={`/specificorder/${order.userId}`}
                    >
                      <button type="button" className="btn btn-primary">
                        View orders
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
          {
            /* }); */
          }
        })}
      </div>
    </>
  );
};
export default VendorOrderist;
