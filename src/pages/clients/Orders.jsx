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
    <div>
      {/* Hero Section */}
      <section style={styles.hero} className="grid gap-y-4 shadow-md">
        <h1 className="text-[#FB6F92]">Purchase Orders</h1>
        <p className="text-[#000000]">
          View your past orders and track the status of your current orders
        </p>
      </section>

      <div style={styles.container}>
        {/* Orders List (8 columns) */}
        <div style={styles.ordersContainer}>
          <h3 className="text-[#FB6F92] mb-4">Your Orders ({orders.length})</h3>
          <hr className="text-black h-4" />
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} style={styles.orderCard} className="shadow-md">
                <h3 style={styles.orderTitle}>Order #{order.id}</h3>
                <p style={styles.orderText}>Date: {order.date}</p>
                <p style={styles.orderText}>Total: {order.total}</p>
                <p style={styles.orderText}>Status: {order.status}</p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index} style={styles.orderText}>
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
          <h3 className="text-[#FB6F92] mb-4">Special Offers</h3>
          <hr className="text-black h-4" />
          <div style={styles.adCard}>
            <img
              src="https://via.placeholder.com/300x200?text=Ad+1"
              alt="Ad 1"
              style={styles.adImage}
            />
            <p style={styles.generalText}>Exclusive discounts on cleaning supplies!</p>
          </div>
          <div style={styles.adCard}>
            <img
              src="https://via.placeholder.com/300x200?text=Ad+2"
              alt="Ad 2"
              style={styles.adImage}
            />
            <p style={styles.generalText}>Buy 1 Get 1 Free on selected items!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  hero: {
    // position: "sticky",
    // top: "0",
    zIndex: "10",
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#f7f7f7",
    // backgroundColor: "#F7B6B6",
    marginBottom: "20px",
  },
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
  orderTitle: {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#FB6F92",
  },
  orderText: {
    fontSize: "14px",
    margin: "5px 0",
    color: "#000",
  },
  generalText: {
    fontSize: "14px",
    margin: "5px 0",
    color: "#000",
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
    backgroundColor: "#f9f9f9",
  },
};

export default Orders;
