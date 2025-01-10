import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for does not exist.</p>
      <Link to="/" style={styles.homeLink}>
        Go Back to Home
      </Link>
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
    height: "100vh",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    padding: "20px",
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
