import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth(); // Assuming useAuth returns [auth, setAuth] and auth contains user info

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/v1/auth/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (auth?.token) {
      fetchOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.map((order, index) => (
              <div className="card mb-3" key={order._id}>
                <div className="card-body">
                  <h5 className="card-title">Order #{index + 1}</h5>
                  <p className="card-text">Status: {order.status}</p>
                  <p className="card-text">
                    Buyer: {order.buyer && order.buyer.name}
                  </p>
                  <p className="card-text">
                    Created At: {moment(order.createdAt).format("LLLL")}
                  </p>
                  <ul className="list-group list-group-flush">
                    {order.products.map((product) => (
                      <li className="list-group-item" key={product._id}>
                        {product.name} - {product.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-center">No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
