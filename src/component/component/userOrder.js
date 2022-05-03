import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Order = () => {
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

  console.log(ordersList)

  return (
    <>
      <div class="admin-card-wraper">
        {ordersList.map((order) => {
          return order.orderDetail.map((orderDetail) => {
             return (

              <div className="cart-card-container" key={order._id}>
                        <div>
                            <div className="cart-card">
                                <div className="cart-card-text">
                                    <div className="cart-card-category">FirstName - <b className="admin-card-head">{orderDetail.firstName}</b></div>                                    
                                    <div className="cart-card-category">LastName - <b className="admin-card-head">{orderDetail.lastName}</b></div>
                                    
                                    <div class="cart-lastrow mb-2">
                                        <div className="cart-card-category">Email - {orderDetail.email}</div>
                                    </div>
                                    <Link id="noUnderline" to={`/specificorder/${order._id}/${orderDetail._id}`}>
                                        <button type="button" className="btn btn-primary">View orders</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
            //   <div>
            //     <div
                  
            //       key={order._id}
            //     >
            //       <div className="cart-card-container" style={{ width: "30rem" }}>
            //         <div className="cart-card">
            //           <div className="cart-card-price">
            //             FirstName - {orderDetail.firstName}
            //           </div>
            //           <div className="cart-card-price">
            //             LastName - {orderDetail.lastName}
            //           </div>
            //           <div className="cart-card-price">
            //             Email - {orderDetail.email}
            //           </div>
            //           <br />
            //           <button className=" button_style_Order">
            //             <i class="fa-solid fa-eye mx-2"></i>
            //             <Link
            //               id="noUnderline"
            //               to={`/specificorder/${order._id}/${orderDetail._id}`}
            //             >
            //               View orders
            //             </Link>
            //           </button>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            );
          });
        })}
      </div>
    </>
  );
};
export default Order;
