import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; // Import date picker component
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [issueDate, setIssueDate] = useState(null); // State for issue date
  const [returnDate, setReturnDate] = useState(null); // State for return date

  useEffect(() => {
    if (params?.slug) {
      getBookDetails();
      getRelatedBooks();
    }
  }, [params?.slug]);

  const getBookDetails = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/book/get-book/${params.slug}`
      );
      setBook(data?.book);
    } catch (error) {
      console.log("Error fetching book details:", error);
    }
  };

  const getRelatedBooks = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/book/related-books/${params.slug}`
      );
      setRelatedBooks(data?.books);
    } catch (error) {
      console.log("Error fetching related books:", error);
    }
  };

  const handleIssueBook = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/book/issue/${book._id}`,
        { issueDate: issueDate }
      );
      // Handle success or show notification
      console.log("Book issued successfully:", data);
    } catch (error) {
      console.error("Error issuing book:", error);
      // Handle error or show notification
    }
  };

  const handleReturnBook = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/book/return/${book._id}`,
        { returnDate: returnDate }
      );
      // Handle success or show notification
      console.log("Book returned successfully:", data);
    } catch (error) {
      console.error("Error returning book:", error);
      // Handle error or show notification
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/book/book-photo/${book._id}`}
            className="card-img-top"
            alt={book.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Book Details</h1>
          <hr />
          <h6>Title: {book.title}</h6>
          <h6>Author: {book.author}</h6>
          <h6>Description: {book.description}</h6>
          <h6>Category: {book.category}</h6>
          <h6>Available Quantity: {book.quantity}</h6>
          <div className="btn-group mt-3" role="group">
            {/* Issue Book Button with Date Picker */}
            <DatePicker
              selected={issueDate}
              onChange={(date) => setIssueDate(date)}
              placeholderText="Select Issue Date"
              className="form-control mb-2"
            />
            <button className="btn btn-secondary" onClick={handleIssueBook}>
              Issue Book
            </button>

            {/* Return Book Button with Date Picker */}
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              placeholderText="Select Return Date"
              className="form-control mb-2"
            />
            <button className="btn btn-secondary" onClick={handleReturnBook}>
              Return Book
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Related Books ➡️</h4>
        {relatedBooks.length < 1 && (
          <p className="text-center">No Related Books found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedBooks?.map((relatedBook) => (
            <div className="card m-2" key={relatedBook._id}>
              <img
                src={`/api/v1/book/book-photo/${relatedBook._id}`}
                className="card-img-top"
                alt={relatedBook.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{relatedBook.name}</h5>
                  <h5 className="card-title card-price">
                    {relatedBook.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {relatedBook.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/book/${relatedBook.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
