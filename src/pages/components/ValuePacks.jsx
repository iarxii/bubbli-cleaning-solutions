import React, { useState } from "react";

// import media
import placholder from "../../assets/placeholder-500x500.jpg";

function ValuePacks() {
  const valueSavingsItems = [
    {
      id: 1,
      name: "Kitchen Cleaning Pack (Mini)",
      description: "",
      currency: "ZAR",
      currencySymbol: "R",
      price: "99.99",
      image: placholder,
      packItems: [
        "1 x 500ml All-Purpose Cleaner",
        "1 x 500ml Dishwashing Liquid",
        "1 x 500ml Ammonia Cleaner",
        "1 x 500ml Bleach Cleaner",
        "1 x 500ml Tile/Floor Cleaner",
        "2 Pack of Sponges",
        "2 Pack of Scourers",
        "Steel Wool",
      ],
    },
    {
      id: 2,
      name: "Kitchen Cleaning Pack (Standard)",
      description: "",
      currency: "ZAR",
      currencySymbol: "R",
      price: "139.99",
      image: placholder,
      packItems: [
        "1 x 750ml All-Purpose Cleaner",
        "1 x 750ml Dishwashing Liquid",
        "1 x 750ml Ammonia Cleaner",
        "1 x 750ml Bleach Cleaner",
        "1 x 750ml Tile/Floor Cleaner",
        "3 Pack of Sponges",
        "3 Pack of Scourers",
        "Steel Wool",
      ],
    },
    {
      id: 3,
      name: "Deep Clean Pack",
      description: "",
      currency: "ZAR",
      currencySymbol: "R",
      price: "149.99",
      image: placholder,
      packItems: [
        "1 x 1lr Pine Gel",
        "1 x 1lr Bleach Cleaner",
        "1 x 1lr Ammonia Cleaner",
        "1 x 750ml Jayes Fluid",
        "Scrubbing Brush",
        "Cleaning Gloves",
        "Bucket",
      ],
    },
    {
      id: 4,
      name: "Clean Home Pack",
      description: "",
      currency: "ZAR",
      currencySymbol: "R",
      price: "189.99",
      image: placholder,
      packItems: [
        "1 x 500ml Air Freshener",
        "1 x 500ml Window Cleaner",
        "1 x 500ml Ammonia Cleaner",
        "1 x 500ml Bleach Cleaner",
        "1 x 500ml Tile/Floor Cleaner",
        "1 x 500ml Multisurface Cleaner",
        "1 x 500ml Furniture Polish",
        "3 Pack of Sponges",
        "3 Pack of Scourers",
        "Steel Wool",
        "2 Pack Toilet Pods",
      ],
    },
    {
      id: 5,
      name: "Laundry Pack",
      description: "",
      currency: "ZAR",
      currencySymbol: "R",
      price: "129.99",
      image: placholder,
      packItems: [
        "1 x 500ml Fabric Softener",
        "1 x 500ml Laundry Detergent",
        "1 x 500ml Stain Remover",
        "1 x 500ml Bleach",
      ],
    },
    {
      id: 6,
      name: "Bathroom Pack",
      description: "",
      currency: "ZAR",
      currencySymbol: "R",
      price: "129.99",
      image: placholder,
      packItems: [
        "1 x 500ml Toilet Cleaner",
        "1 x 500ml Tile/Floor Cleaner",
        "1 x 500ml Ammonia Cleaner",
        "1 x 500ml Bleach Cleaner",
        "1 x 500ml Tile/Floor Cleaner",
        "1 x 500ml Air Freshener",
        "3 Pack of Toilet Pods",
        "3 Pack Toilet Paper"
      ],
    },{
      id: 7,
      name: "3-Month Bundle Offer",
      description: "",
      currency: "ZAR",
      currencySymbol: "R",
      price: "359.99",
      image: placholder,
      packItems: [
        "1 x 1lr All-Purpose Cleaner",
        "1 x 1lr Dishwashing Liquid",
        "1 x 1lr Ammonia Cleaner",
        "1 x 1lr Bleach Cleaner",
        "1 x 1lr Tile/Floor Cleaner",
        "1 x 1lr Pine Gel",
        "1 x 1lr Air Freshener",
        "1 x 1lr Window Cleaner",
        "1 x 1lr Ammonia Cleaner",
        "1 x 1lr Multisurface Cleaner",
        "1 x 1lr Furniture Polish",
        "4 Pack Toilet Pods",
        "1 x 1lr Fabric Softener",
        "1 x 1lr Laundry Detergent",
        "1 x 1lr Toilet Cleaner",
        "9 Pack of Sponges",
        "9 Pack of Scourers",
        "Steel Wool",
      ],
    }
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
            <ul style={{maxHeight: "120px", overflowY: "auto"}}>
              {item.packItems.map((packItem, index) => (
                <li key={index} className="text-[#FB6F92]">{packItem}</li>
              ))}
            </ul>
            <p className="text-[#FB6F92] mt-2 mb-6">{item.packItems.length} Items</p>
            <div class="h-2 w-12 my-4 bg-[#FB6F92] mx-auto rounded-xl"></div>
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
