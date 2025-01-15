import React from "react";
import { Link } from "react-router-dom";

import meshBackground from "../assets/brand/mesh-white-0_7.png";
import meshBackgroundRed from "../assets/brand/mesh-red-1.png";

function NotFound() {
  return (
    <div style={styles.container} className="glassmorphic">
      <div style={{backgroundColor: "#fff", padding: "40px", borderRadius: "16px"}}>
        <h1 style={styles.heading}>404</h1>
        <p style={styles.message}>Oops! The page you're looking for does not exist.</p>
        <Link to="/" style={styles.homeLink}>
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    // backgroundColor: "#fff",
    backgroundImage: `url(${meshBackgroundRed})`,
    backgroundClip: "padding-box",
    backgroundSize: "cover", // Ensures the background image covers the entire container
    backgroundPosition: "center", // Centers the background image
    backgroundAttachment: "fixed", // Fixes the background image in place
    textAlign: "center",
    padding: "0px",
  },
  heading: {
    fontSize: "72px",
    fontWeight: "bold",
    color: "#dc3545",
  },
  message: {
    fontSize: "24px",
    margin: "20px 0",
    color: "#6c757d",
  },
  homeLink: {
    fontSize: "18px",
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default NotFound;
