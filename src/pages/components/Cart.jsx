import { faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactDOM from "react-dom";

function Cart({ isOpen, onClose, cartItems, onRemoveItem }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      {/* { ...styles.overlay, display: isOpen ? "block" : "none" } */}
      <div style={styles.cartPanel}>
        {/* Cart Header */}
        <div style={styles.cartHeader}>
          <h2 style={styles.cartTitle}>Your Cart</h2>
          <button onClick={onClose} style={styles.closeButton}>
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div style={styles.cartContent}>
          {cartItems.length === 0 ? (
            <p style={styles.cartNoItemsText}>Your cart is empty</p>
          ) : ( 
            cartItems.map((item, index) => (
              <div key={index} style={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.cartItemImage}
                />
                <div style={styles.cartItemDetails}>
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => onRemoveItem(index)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        <div style={styles.cartFooter}>
          <button className="shadow-lg" style={styles.checkoutButton} onClick={() => alert("Checkout coming soon!")}>
            <div className="flex gap-x-2 items-center">
              <FontAwesomeIcon icon={faCashRegister} />
              <span>Checkout</span>
            </div>
          </button>
        </div>
      </div>
    </div>,
    document.body // Render the cart component at the root level
  );
}

// Styles
const styles = {
  overlay: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  cartPanel: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    maxHeight: "70%",
    overflowY: "auto",
    zIndex: 1001,
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#FB6F92",
  },
  cartTitle: {
    margin: 0,
    color: "#fff",
    fontSize: "28px",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
  cartContent: {
    padding: "20px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  cartNoItemsText: {
    textAlign: "center",
    color: "#777",
  },
  cartItemImage: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    marginRight: "10px",
  },
  cartItemDetails: {
    flex: 1,
    color: "#333",
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cartFooter: {
    padding: "10px 20px",
    borderTop: "1px solid #ddd",
    textAlign: "right",
    backgroundColor: "#FB6F92",
  },
  checkoutButton: {
    backgroundColor: "#fff",
    color: "#FB6F92",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Cart;
