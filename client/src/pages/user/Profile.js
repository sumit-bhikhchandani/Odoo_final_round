import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { Card } from "antd"; // Import Card component from Ant Design

const Profile = () => {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isbn, setIsbn] = useState(""); // State for ISBN input
  const [bookDetails, setBookDetails] = useState(null); // State for fetched book details

  // Fetch user data on component mount
  useEffect(() => {
    const { email, name, phone, address } = auth?.user || {};
    setName(name || "");
    setPhone(phone || "");
    setEmail(email || "");
    setAddress(address || "");
  }, [auth?.user]);

  // Function to fetch book details from Google Books API.
  const fetchBookDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=ISBN:${isbn}`
      );
      console.log("Google Books API response:", data); // Log API response for debugging

      if (data.items && data.items.length > 0) {
        const bookInfo = data.items[0].volumeInfo;
        const fetchedDetails = {
          name: bookInfo.title || "",
          description: bookInfo.description || "",
          photo: bookInfo.imageLinks?.thumbnail || "",
          // You may add more fields as needed (author, publisher, etc.)
        };
        setBookDetails(fetchedDetails);
        // Autofill form fields with fetched book details (optional for profile)
        // setName(fetchedDetails.name);
        // setDescription(fetchedDetails.description);
        // setPhoto(fetchedDetails.photo);
      } else {
        toast.error("Book not found. Please check the ISBN.");
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
      toast.error("Failed to fetch book details. Please try again later.");
    }
  };

  // Function to handle ISBN input change
  const handleISBNChange = (e) => {
    setIsbn(e.target.value);
  };

  // Function to handle form submission (optional for profile)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle profile update logic here
    // Example: Update user profile using axios.put
    // const { data } = await axios.put("/api/v1/auth/profile", { name, email, phone, address });
    // Handle success/error responses
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Address"
                  />
                </div>

                {/* ISBN Input and Fetch Button */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={isbn}
                    placeholder="Enter ISBN to fetch book details"
                    className="form-control"
                    onChange={handleISBNChange}
                  />
                  <button
                    className="btn btn-outline-secondary mt-2"
                    onClick={fetchBookDetails}
                  >
                    Fetch Book Details
                  </button>
                </div>

                {/* Display Book Details if Fetched */}
                {bookDetails && (
                  <Card
                    title={bookDetails.name}
                    style={{ width: "100%", marginBottom: "20px" }}
                  >
                    <div className="text-center">
                      {bookDetails.photo && (
                        <img
                          src={bookDetails.photo}
                          alt="book_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      )}
                    </div>
                    <p>{bookDetails.description}</p>
                  </Card>
                )}

                {/* Update Profile Button */}
                <button type="submit" className="btn btn-primary">
                  UPDATE PROFILE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
