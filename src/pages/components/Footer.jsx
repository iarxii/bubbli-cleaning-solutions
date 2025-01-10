import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.flexGrid}>
        {/* About Section */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>About Us</h4>
          <p style={styles.text}>
            At Bubbli Cleaning Solutions, we provide premium cleaning products
            to keep your home spotless and hygienic. Your satisfaction is our
            priority!
          </p>
        </div>

        {/* Quick Links Section */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Quick Links</h4>
          <ul style={styles.list}>
            <li>
              <Link to="/clients/home" style={styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/clients/products" style={styles.link}>
                Catalogue
              </Link>
            </li>
            <li>
              <Link to="/clients/cart" style={styles.link}>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/clients/orders" style={styles.link}>
                Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect with Us Section */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Connect with Us</h4>
          <p style={styles.text}>Email: support@bubbli.com</p>
          <p style={styles.text}>Phone: +1 (555) 123-4567</p>
          <div style={styles.socialIcons}>
            <a
              href="https://facebook.com"
              style={styles.socialLink}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://via.placeholder.com/24?text=FB"
                alt="Facebook"
              />
            </a>
            <a
              href="https://twitter.com"
              style={styles.socialLink}
              target="_blank"
              rel="noreferrer"
            >
              <img src="https://via.placeholder.com/24?text=TW" alt="Twitter" />
            </a>
            <a
              href="https://instagram.com"
              style={styles.socialLink}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://via.placeholder.com/24?text=IG"
                alt="Instagram"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={styles.copyright}>
        <p>&copy; 2025 Bubbli Cleaning Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    marginTop: "40px",
  },
  flexGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
  section: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "14px",
    margin: "5px 0",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    marginBottom: "5px",
    display: "block",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  socialLink: {
    display: "inline-block",
  },
  copyright: {
    borderTop: "1px solid #fff",
    paddingTop: "10px",
    marginTop: "20px",
    fontSize: "12px",
  },
};

export default Footer;
