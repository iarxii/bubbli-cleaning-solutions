import React from "react";

function Cart({ isOpen, onClose, cartItems, onRemoveItem }) {
  return (
    <div style={{ ...styles.overlay, display: isOpen ? "block" : "none" }}>
      <div style={styles.cartPanel}>
        {/* Cart Header */}
        <div style={styles.cartHeader}>
          <h2>Your Cart</h2>
          <button onClick={onClose} style={styles.closeButton}>
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div style={styles.cartContent}>
          {cartItems.length > 0 ? (
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
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Cart Footer */}
        <div style={styles.cartFooter}>
          <button style={styles.checkoutButton} onClick={() => alert("Checkout coming soon!")}>
            Checkout
          </button>
        </div>
      </div>
    </div>
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
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "18px",
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
  cartItemImage: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    marginRight: "10px",
  },
  cartItemDetails: {
    flex: 1,
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
  },
  checkoutButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Cart;
