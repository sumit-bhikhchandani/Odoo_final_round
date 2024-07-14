import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select, Card } from "antd"; // Import Card component from Ant Design
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [isbn, setIsbn] = useState(""); // State for ISBN input
  const [bookDetails, setBookDetails] = useState(null); // State for fetched book details

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
        // Autofill form fields with fetched book details
        setName(fetchedDetails.name);
        setDescription(fetchedDetails.description);
        setPhoto(fetchedDetails.photo);
      } else {
        toast.error("Book not found. Please check the ISBN.");
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
      toast.error("Failed to fetch book details. Please try again later.");
    }
  };

  // Function to handle form submission
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      // Call your backend API to create the product with productData
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Failed to create product. Please try again.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again later.");
    }
  };

  // Function to handle ISBN input change
  const handleISBNChange = (e) => {
    setIsbn(e.target.value);
  };

  useEffect(() => {
    // Fetch all categories when component mounts
    getAllCategory();
  }, []);

  // Function to fetch all categories from your backend API
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories. Please try again later.");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
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
              {bookDetails && (
                <>
                  <Card title={bookDetails.name} style={{ width: "100%", marginBottom: "20px" }}>
                    <div className="text-center">
                      {bookDetails.photo && (
                        <img
                          src={bookDetails.photo}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      )}
                    </div>
                    <p>{bookDetails.description}</p>
                  </Card>
                  <Select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setCategory(value);
                    }}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="mb-3">
                    <label className="btn btn-outline-secondary col-md-12">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      placeholder="Write a name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      value={description}
                      placeholder="Write a description"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={price}
                      placeholder="Write a Price"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="Write a quantity"
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary"
                      onClick={handleCreate}
                    >
                      CREATE PRODUCT
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
