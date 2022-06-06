import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Order = () => {
  const [ordersList, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getOrdersData();
  }, []);

  const getOrdersData = async () => {
    let result = await axios.get(`https://vmart-api.herokuapp.com/order`, {
    });
    result = result.data
    setOrders(result);
  };

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <button
          type="button"
          className="btn btn-danger btn-lg"
          id="login_btn-style"
          onClick={() => {
            history.go(-1);
          }}
        >
          Cancel
        </button>
      </div>
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
          );
        })}
      </div>
    </>
  );
};
export default Order;
