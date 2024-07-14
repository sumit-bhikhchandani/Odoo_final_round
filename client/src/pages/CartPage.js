import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total price calculation
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Handle issuing books
  const handleIssueBook = async () => {
    try {
      setLoading(true);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Books Issued Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Handle returning books
  const handleReturnBook = async () => {
    try {
      setLoading(true);
      // Simulate return process

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Books Returned Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to proceed"
                  }`
                : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((book) => (
              <div className="row mb-2 p-3 card flex-row" key={book._id}>
                <div className="col-md-4">
                  {/* Book cover image */}
                  <img
                    src={`/api/v1/product/product-photo/${book._id}`}
                    className="card-img-top"
                    alt={book.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{book.name}</p>
                  <p>{book.description.substring(0, 30)}</p>
                  {/* Display issue date and return date */}
                  <p>Issue Date: {book.issueDate}</p>
                  <p>Return Date: {book.returnDate}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(book._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Book Issue & Return</p>
            <hr />
            {/* Display user's address */}
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {/* Redirect to login if not logged in */}
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Proceed
                  </button>
                )}
              </div>
            )}
            {/* Buttons for issuing and returning books */}
            <div className="mt-2">
              {/* Show buttons if there are books in the cart */}
              {cart?.length > 0 && (
                <>
                  <button
                    className="btn btn-primary me-2"
                    onClick={handleIssueBook}
                    disabled={loading || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Issue Books"}
                  </button>
                  
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
