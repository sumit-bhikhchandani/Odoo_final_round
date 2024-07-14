import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import "../../styles/Dashboard.css"; // Ensure you have appropriate styles

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <div className="dashboard-container">
      <UserMenu />
      <div className="dashboard-details">
        <div className="card dashboard-card">
          <h2>🧑: {auth?.user?.name}</h2>
          <h3>📧: {auth?.user?.email}</h3>
          <h3>📍: {auth?.user?.address}</h3>
          <h3>📱: {auth?.user?.phone}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
