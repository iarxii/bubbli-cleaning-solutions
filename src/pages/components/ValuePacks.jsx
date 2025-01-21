import React, { useState } from "react";

// import media
import placholder from "../../assets/placeholder-500x500.jpg";

function ValuePacks() {
  const valueSavingsItems = [
    {
      id: 1,
      name: "Kitchen Cleaning Pack",
      description: "",
      currency: "ZAR",
      currencySymbol: "R",
      price: "29.99",
      image: placholder,
      packItems: [
        "1 x 500ml All-Purpose Cleaner",
        "1 x 500ml Dishwashing Liquid",
        "1 x 500ml Floor Cleaner",
        "1 x 500ml Window Cleaner",
        "1 x 500ml Toilet Cleaner",
      ],
    },
    {
      id: 2,
      name: "Deep Clean Pack",
      description: "",
      currency: "ZAR",
      currencySymbol: "R",
      price: "39.99",
      image: placholder,
      packItems: [
        "",
        "",
        "",
        "",
        "",
      ],
    },
    {
      id: 3,
      name: "Clean Home Pack",
      description: "",
      currency: "ZAR",
      currencySymbol: "R",
      price: "39.99",
      image: placholder,
      packItems: [
        "",
        "",
        "",
        "",
        "",
      ],
    },
    {
      id: 4,
      name: "3-Month Bundle Offer",
      description: "",
      currency: "ZAR",
      currencySymbol: "R",
      price: "49.99",
      image: placholder,
      packItems: [
        "",
        "",
        "",
        "",
        "",
      ],
    },
    {
      id: 5,
      name: "Home Cleaning Kit",
      description: "",
      currency: "ZAR",
      currencySymbol: "R",
      price: "59.99",
      image: placholder,
      packItems: [
        "",
        "",
        "",
        "",
        "",
      ],
    },
  ];

  // State
  // const [products, setProducts] = useState(valueSavingsItems);

  // Handlers
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    // Value Savings Section
    <section style={styles.valueSavings}>
      <div style={styles.scrollContainer}>
        {valueSavingsItems.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.cardImage} />
            <h3 style={styles.cardTitle}>{item.name}</h3>
            <p style={styles.cardPrice} className="pb-2">
              {item.currencySymbol} {item.price}
            </p>
            <button
              style={styles.addToCartButton}
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
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
    color: "#FB6F92",
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
    color: "#FB6F92",
  },
  cardPrice: {
    fontSize: "28px",
    color: "#FB6F92",
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
    backgroundColor: "#FB6F92",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#FB6F92",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default ValuePacks;
