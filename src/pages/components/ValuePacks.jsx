import React from "react";

// import media
import placholder from "../../assets/placeholder-500x500.jpg";

function ValuePacks() {
  const valueSavingsItems = [
    {
      id: 1,
      name: "Kitchen Cleaning Pack",
      currency: "ZAR",
      currencySymbol: "R",
      price: "29.99",
      image: placholder,
    },
    {
      id: 2,
      name: "Deep Clean Pack",
      currency: "ZAR",
      currencySymbol: "R",
      price: "39.99",
      image: placholder,
    },
    {
      id: 3,
      name: "Clean Home Pack",
      currency: "ZAR",
      currencySymbol: "R",
      price: "39.99",
      image: placholder,
    },
    {
      id: 4,
      name: "3-Month Bundle Offer",
      currency: "ZAR",
      currencySymbol: "R",
      price: "49.99",
      image: placholder,
    },
    {
      id: 5,
      name: "Home Cleaning Kit",
      currency: "ZAR",
      currencySymbol: "R",
      price: "59.99",
      image: placholder,
    },
  ];

  return (
    // Value Savings Section
    <section style={styles.valueSavings}>
      <div style={styles.scrollContainer}>
        {valueSavingsItems.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.cardImage} />
            <h3 style={styles.cardTitle}>{item.name}</h3>
            <p style={styles.cardPrice}>
              {item.currencySymbol} {item.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
    //   container: {
    //     fontFamily: "'Poppins', sans-serif",
    //     padding: "20px",
    //   },
  valueSavings: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#E44548",
  },
  scrollContainer: {
    display: "flex",
    overflowX: "auto",
    gap: "20px",
    padding: "20px 10px",
  },
  card: {
    flex: "0 0 auto",
    width: "300px",
    textAlign: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  },
  cardImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "16px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "10px 0",
    color: "#E44548",
  },
  cardPrice: {
    fontSize: "28px",
    color: "#E44548",
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
    backgroundColor: "#E44548",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export default ValuePacks;
