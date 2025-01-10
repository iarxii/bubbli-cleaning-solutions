import React, {useState}  from "react";
import { Link } from "react-router-dom";

// import media
import logo from "../../assets/bubbli-icon_white.svg";
import avatar from "../../assets/profile_avatar.jpg";

import Cart from "../clients/Cart";

function Header() {
  // Example: Mocking user login state
  const isLoggedIn = true; // Change to `false` to test behavior for non-logged-in users
  const userProfile = {
    name: "John Doe",
    profileImage: "https://via.placeholder.com/40", // Replace with actual profile image URL
  };

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Mock function to remove item
  const handleRemoveItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  // Mock function to add an item (triggered from product cards, for example)
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.logo}>
          {/* Placeholder for your logo */}
          {/* <h1 style={styles.logoText}>Bubbli Cleaning Solutions</h1> */}
          <img src={logo} style={styles.logo} alt="Bubbli Logo" />
        </div>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/clients/home" style={styles.link}>
              Shop
            </Link>
          </li>
          {/* <li style={styles.navItem}>
            <Link to="/clients/products" style={styles.link}>
              Catalogue
            </Link>
          </li> */}
          {!isLoggedIn ? (
            <li style={styles.navItem}>
              <Link to="/clients/login" style={styles.link}>
                Login
              </Link>
            </li>
          ) : (
            <>
              <li style={styles.navItem}>
                <Link to="/clients/orders" style={styles.link}>
                  Orders
                </Link>
              </li>
              <li style={styles.navItem}>
                {/* <Link to="/clients/cart" style={styles.link}>
                  <span role="img" aria-label="Cart" style={styles.icon}>
                    🛒
                  </span>{" "}
                  Cart
                </Link> */}
                <button onClick={() => setCartOpen(true)}>
                  Cart ({cartItems.length})
                </button>
              </li>
              <li style={styles.navItem}>
                <Link to="/clients/profile" style={styles.profileLink}>
                  <img
                    src={avatar}
                    alt="User Profile"
                    style={styles.profileImage}
                  />
                  <span style={styles.profileName}>{userProfile.name}</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
      />
    </>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: "0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    width: "100px",
    height: "100px",
  },
  logoText: {
    margin: 0,
    fontSize: "20px",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
  icon: {
    marginRight: "5px",
  },
  profileLink: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    textDecoration: "none",
  },
  profileImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  profileName: {
    fontSize: "16px",
  },
};

/* 
<nav>
    <img src="./bubbli-icon_white.svg" alt="svg image here" style="height: auto;width: 500px;"/>
    <h1>Bubbli Cleaning Solutions</h1>
    <ul>
      <li>
        <Link to="/clients/home">Home</Link>
      </li>
      <li>
        <Link to="/clients/products">Catalogue</Link>
      </li>
      <li>
        <Link to="/clients/login">Login</Link>
      </li>
    </ul>
  </nav>
*/

export default Header;
