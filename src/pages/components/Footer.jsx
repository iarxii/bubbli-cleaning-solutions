import React from "react";
import { Link } from "react-router-dom";

import ChatWindow from "./ChatWindow";

// import icons
import facebookIcon from "../../assets/icons/48/icons8-facebook-48(1).svg";
import twitterXIcon from "../../assets/icons/48/icons8-x-48.svg";
import whatsappIcon from "../../assets/icons/48/icons8-whatsapp-48(1).svg";

// import media
import meshBackground from "../../assets/brand/mesh-white-0_7.png";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerWrap}>
        <div className="container mx-auto" style={styles.flexGrid}>
          {/* About Section */}
          <div style={styles.section} className="flex flex-col justify-center">
            <h3 style={styles.sectionTitle}>About Us</h3>
            <div className="h-1 w-16 bg-[#1EBA15] mx-auto my-2 rounded-xl"></div>
            <p style={styles.text}>
              At Bubbli Cleaning Solutions, we provide premium cleaning products
              to keep your home spotless and hygienic. Your satisfaction is our
              priority!
            </p>
          </div>

          {/* Quick Links Section */}
          <div style={styles.section} className="flex flex-col justify-center">
            <h3 style={styles.sectionTitle}>Quick Links</h3>
            <div className="h-1 w-16 bg-[#1EBA15] mx-auto my-2 rounded-xl"></div>
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
          <div style={styles.section} className="flex flex-col justify-center">
            <h3 style={styles.sectionTitle}>Connect with Us</h3>
            <div className="h-1 w-16 bg-[#1EBA15] mx-auto my-2 rounded-xl"></div>
            <p style={styles.text}>Email: support@bubbli.co.za</p>
            <p style={styles.text}>Phone: 071 269 4232</p>
            <div style={styles.socialIcons}>
              <a
                href="https://facebook.com"
                style={styles.socialLink}
                target="_blank"
                rel="noreferrer"
              >
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a
                href="https://x.com"
                style={styles.socialLink}
                target="_blank"
                rel="noreferrer"
              >
                <img src={twitterXIcon} alt="Twitter" />
              </a>
              <a
                href="https://whatsapp.com"
                style={styles.socialLink}
                target="_blank"
                rel="noreferrer"
              >
                <img src={whatsappIcon} alt="Whatsapp" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={styles.copyright}>
        <div className="container mx-auto flex flex-col items-center justify-between lg:flex-row">
          <p className="w-full text-left lg:w-auto lg:text-center" 
            style={styles.copyrightText}>
            &copy; 2025 Bubbli Cleaning Solutions. All rights reserved.
          </p>
          {/* Chat window */}
          <div style={styles.chatWindow}>
            <ChatWindow />
          </div>
        </div>
      </div>

      {/* Chat window */}
      <div style={styles.chatWindow}>
        <ChatWindow />
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#E44548",
    color: "#fff",
    // padding: "20px",
    textAlign: "center",
    marginTop: "40px",
  },
  footerWrap: {
    // display: "flex",
    // flexDirection: "column", // Ensures content is stacked vertically
    // alignItems: "center", // Centers content horizontally
    // justifyContent: "center", // Centers content vertically
    padding: "50px 20px",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${meshBackground})`,
    backgroundClip: "padding-box",
    backgroundSize: "cover", // Ensures the background image covers the entire container
    backgroundPosition: "center", // Centers the background image
    backgroundAttachment: "fixed", // Fixes the background image in place
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
    color: "#fff",
  },
  headerText: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#fff",
  },
  text: {
    fontSize: "14px",
    margin: "5px 0",
    color: "#fff",
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
    // borderTop: "1px solid #fff",
    padding: "20px",
    // marginTop: "20px",
    fontSize: "12px",
    backgroundColor: "#fff",
  },
  copyrightText: {
    color: "#E44548",
  },
  chatWindow: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "300px",
    height: "auto",
    // backgroundColor: '#fff',
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px 8px 0 0",
    zIndex: 1000,
  },
};

export default Footer;
