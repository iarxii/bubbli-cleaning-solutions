import React, { useState } from "react";

// import components
import SpecialOffers from "../components/SpecialOffers";

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
    <div className="glassmorphic">
      {/* Hero Title */}
      <section className="grid gap-y-4 shadow-md text-center p-10 bg-[#f7f7f7] mb-5 z-10">
        <h1 className="text-[#FB6F92]">Purchase Orders</h1>
        <p className="text-black">
          View your past orders and track the status of your current orders
        </p>
      </section>

      <div className="flex flex-col lg:flex-row gap-5 p-5">
        {/* Orders List (8 columns) */}
        <div className="flex-1 lg:flex-2 bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-[#FB6F92] mb-4">Your Orders ({orders.length})</h3>
          <hr className="text-black h-4" />
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="mb-5 p-4 border border-gray-300 rounded-lg bg-[#f9f9f9] shadow-md">
                <h3 className="text-lg font-bold text-[#FB6F92] mb-2">Order #{order.id}</h3>
                <p className="text-sm text-black mb-1">Date: {order.date}</p>
                <p className="text-sm text-black mb-1">Total: {order.total}</p>
                <p className="text-sm text-black mb-1">Status: {order.status}</p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm text-black mb-1">
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
        <div className="flex-1 lg:flex-1 bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-[#FB6F92] mb-4">Special Offers</h3>
          <hr className="text-black h-4" />
          <SpecialOffers />
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
