import React from "react";

import { Link } from "react-router-dom";

// import media
import placholder from "../../assets/placeholder-500x500.jpg";

function SpecialOffers() {
  const specialOffersItems = [
    {
      id: 1,
      name: "Exclusive discounts on cleaning supplies!",
      callToAction: "Subscribe now",
      description:
        "Get exclusive discounts on a wide range of cleaning supplies by subscribing to our newsletter. Don't miss out on these limited-time offers!",
      catNavLink: "#",
      postDate: "2025-01-30",
      postEnd: "",
      image: placholder,
    },
    {
      id: 2,
      name: "Buy 1 Get 1 Free on Selected items!",
      callToAction: "Open Selection",
      description:
        "Take advantage of our Buy 1 Get 1 Free offer on selected cleaning items. Stock up on your favorites and save big!",
      ctaNavLink: "#",
      postDate: "2025-01-30",
      postEnd: "",
      image: placholder,
    },
  ];

  return (
    // Special Offers Section
    <section style={styles.specialOffers}>
      <div style={styles.scrollContainer}>
        {specialOffersItems.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.cardImage} />
            <h3 style={styles.cardTitle}>{item.name}</h3>
            <div class="mx-auto my-4 h-2 w-12 rounded-xl bg-[#FB6F92]"></div>
            <Link to={item.ctaNavLink} style={styles.ctaButton}>
                {item.callToAction}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
    specialOffers: {
        marginBottom: "40px",
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
}

export default SpecialOffers;
