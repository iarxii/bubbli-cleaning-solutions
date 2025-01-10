import React, { useState } from "react";

function Orders() {
  // Mock user orders
  const mockOrders = [
    {
      id: 1,
      date: "2025-01-01",
      total: "$49.99",
      items: [
        { name: "Product A", quantity: 1 },
        { name: "Product B", quantity: 2 },
      ],
      status: "Delivered",
    },
    {
      id: 2,
      date: "2025-01-05",
      total: "$29.99",
      items: [{ name: "Product C", quantity: 3 }],
      status: "Shipped",
    },
    {
      id: 3,
      date: "2025-01-10",
      total: "$19.99",
      items: [{ name: "Product D", quantity: 1 }],
      status: "Processing",
    },
  ];

  // State to hold orders (for potential API integration)
  const [orders] = useState(mockOrders);

  return (
    <div style={styles.container}>
      {/* Orders List (8 columns) */}
      <div style={styles.ordersContainer}>
        <h2>Your Orders</h2>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} style={styles.orderCard}>
              <h3>Order #{order.id}</h3>
              <p>Date: {order.date}</p>
              <p>Total: {order.total}</p>
              <p>Status: {order.status}</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.quantity} x {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>You have no past orders.</p>
        )}
      </div>

      {/* Ads Section (4 columns) */}
      <div style={styles.adsContainer}>
        <h3>Special Offers</h3>
        <div style={styles.adCard}>
          <img
            src="https://via.placeholder.com/300x200?text=Ad+1"
            alt="Ad 1"
            style={styles.adImage}
          />
          <p>Exclusive discounts on cleaning supplies!</p>
        </div>
        <div style={styles.adCard}>
          <img
            src="https://via.placeholder.com/300x200?text=Ad+2"
            alt="Ad 2"
            style={styles.adImage}
          />
          <p>Buy 1 Get 1 Free on selected items!</p>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
  },
  ordersContainer: {
    flex: 8,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  orderCard: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  adsContainer: {
    flex: 4,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  adCard: {
    marginBottom: "20px",
    textAlign: "center",
  },
  adImage: {
    width: "100%",
    height: "auto",
    marginBottom: "10px",
  },
};

export default Orders;
