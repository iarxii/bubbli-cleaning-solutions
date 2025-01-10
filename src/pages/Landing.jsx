import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  const valueSavingsItems = [
    { id: 1, name: "Value Pack 1", price: "R29.99", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Value Pack 2", price: "R39.99", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Bundle Offer", price: "R49.99", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Cleaning Kit", price: "R59.99", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to Bubbli Cleaning Solutions</h1>
        <p style={styles.heroSubtitle}>Give your home a Bubbli Clean with our premium cleaning products!</p>
        <Link to="/clients/products" style={styles.heroButton}>
          Shop Now
        </Link>
      </section>

      {/* Value Savings Section */}
      <section style={styles.valueSavings}>
        <h2 style={styles.sectionTitle}>Value Savings</h2>
        <div style={styles.scrollContainer}>
          {valueSavingsItems.map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} alt={item.name} style={styles.cardImage} />
              <h3 style={styles.cardTitle}>{item.name}</h3>
              <p style={styles.cardPrice}>{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Explore Our Full Catalogue</h2>
        <p style={styles.ctaSubtitle}>Discover the perfect cleaning solutions for every need.</p>
        <Link to="/clients/products" style={styles.ctaButton}>
          View Catalogue
        </Link>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    padding: "20px",
  },
  hero: {
    textAlign: "center",
    padding: "50px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    borderRadius: "8px",
    marginBottom: "40px",
  },
  heroTitle: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  heroSubtitle: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  heroButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#007BFF",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  valueSavings: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  scrollContainer: {
    display: "flex",
    overflowX: "auto",
    gap: "20px",
    padding: "10px",
  },
  card: {
    flex: "0 0 auto",
    width: "200px",
    textAlign: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "10px",
  },
  cardImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  cardTitle: {
    fontSize: "16px",
    margin: "10px 0",
  },
  cardPrice: {
    fontSize: "14px",
    color: "#007BFF",
    fontWeight: "bold",
  },
  cta: {
    textAlign: "center",
    padding: "30px 20px",
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
  },
  ctaTitle: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  ctaSubtitle: {
    fontSize: "16px",
    marginBottom: "20px",
  },
  ctaButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export default Landing;
