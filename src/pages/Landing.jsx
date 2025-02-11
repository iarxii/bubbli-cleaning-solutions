import React from "react";
import { Link } from "react-router-dom";

import ValuePacks from "./components/ValuePacks";

// custom css
import "./custom.css";

// import media
import meshBackground from "../assets/brand/mesh-white-0_7.png";
import heroImage from "../assets/pexels/pexels-liliana-drew-9462650.jpg";
import bubbliLogo from "../assets/bubbli-icon_white.svg";
import savingsTreeIconWhite from "../assets/icons/icons8-growing-money-100-white.png";
import savingsTreeIconGreen from "../assets/icons/icons8-growing-money-100-green.png";
import flavourProductImgPH1 from "../assets/carousel/placeholder-1.jpeg";
import flavourProductImgPH2 from "../assets/carousel/placeholder-2.jpeg";
import flavourProductImgPH3 from "../assets/carousel/placeholder-3.jpeg";
import flavourProductImgPH4 from "../assets/carousel/placeholder-4.jpeg";

function Landing() {
  const bubbliFlavours = [
    { image: flavourProductImgPH1, alt: "Flavour Placeholder 1" },
    { image: flavourProductImgPH2, alt: "Flavour Placeholder 2" },
    { image: flavourProductImgPH3, alt: "Flavour Placeholder 3" },
    { image: flavourProductImgPH4, alt: "Flavour Placeholder 4" },
  ];

  return (
    <div
      className="glassmorphic container mx-auto p-4"
      style={styles.container}
    >
      {/* Hero Section */}
      <section style={styles.hero} className="rounded-lg shadow-lg animate__animated animate__zoomIn fadeInUp animate__delay-1sz">
        <div className="glassmorphic-red">
          <div style={styles.heroWrap} className="gap-y-4">
            <img
              src={bubbliLogo}
              alt="Bubbli Cleaning Solutions"
              style={styles.heroLogo} 
              className="animate__animated animate__fadeInUp animate__delay-1s"
            />
            {/* <h1 style={styles.heroTitle}>
              <span
                className="comfortaa"
                style={{ fontWeight: "bold", fontSize: "40px" }}
              >
                cleaning solutions
              </span>
            </h1> */}
            <p style={styles.heroSubtitle} className="animate__animated animate__fadeInUp animate__delay-2s">
              Give your home a <b className="comfortaa">Bubbli Clean</b>!
            </p>
            <Link
              to="/clients/home/#anchor-catalogue"
              style={styles.heroButton}
              className="animate__animated animate__fadeInUp animate__delay-2s button"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Value Savings Section */}
      <section
        className="bg-whitez shadow-lgz rounded-lg"
        style={styles.valueSavings}
      >
        <div className="flex flex-col items-center justify-center gap-y-4">
          <img
            src={savingsTreeIconWhite}
            alt="savings tree"
            style={{
              height: "200px",
              borderRadius: "50%",
              backgroundColor: "#FB6F92",
              padding: "30px",
            }}
            className="shadow-md"
          />
          <h2 style={styles.valuePacksSectionTitle}>
            <b>Get a Savings Pack for more Clean, for Longer!</b>
          </h2>
        </div>
        <ValuePacks />
      </section>

      {/* Call to Action Section */}
      <section style={styles.cta} className="rounded-lg shadow-lg">
        <div style={styles.ctaWrap} className="glassmorphic-red">
          {/* bubbli flavour cards */}
          <div className="flex flex-col sm:flex-row sm:flex-nowrap gap-2 pb-4">
            {bubbliFlavours.map((flavour, index) => (
              <div key={index} className="w-full sm:w-1/4 p-2">
                <img
                  className="h-auto w-full"
                  src={flavour.image}
                  alt={flavour.alt}
                  style={styles.flavourImage}
                />
              </div>
            ))}
          </div>

          <h2 className="comfortaa" style={styles.ctaTitle}>
            Explore Our Flavours of Clean
          </h2>
          <p style={styles.ctaSubtitle}>
            Discover the perfect cleaning solutions for every need with the
            Bubbli Flavours range.
          </p>
          <Link to="/clients/bubbli/flavours" style={styles.ctaButton} 
            className="button">
            Browse Bubbli Flavours
          </Link>

        </div>
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
    // padding: "50px 20px",
    backgroundColor: "#FB6F92",
    // backgroundImage:"#F7B6B6",
    // backgroundImage: `url(${heroImage})`,
    // backgroundClip: "padding-box",
    // backgroundSize: "cover", // Ensures the background image covers the entire container
    // backgroundPosition: "center", // Centers the background image
    // backgroundAttachment: "fixed", // Fixes the background image in place
    color: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    marginBottom: "40px",
    justifyContent: "center",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heroWrap: {
    display: "flex",
    flexDirection: "column", // Ensures content is stacked vertically
    alignItems: "center", // Centers content horizontally
    justifyContent: "center", // Centers content vertically
    padding: "50px 20px",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${meshBackground})`,
    backgroundClip: "padding-box",
    backgroundSize: "cover", // Ensures the background image covers the entire container
    backgroundPosition: "center", // Centers the background image
    backgroundAttachment: "fixed", // Fixes the background image in place
  },
  heroGradient: {
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(228,69,72,1) 100%)",
    borderRadius: "8px",
  },
  heroLogo: {
    width: "300px",
    height: "300px",
    objectFit: "cover",
    // borderRadius: "50%",
  },
  heroTitle: {
    fontSize: "32px",
    marginBottom: "10px",
    color: "#fff",
  },
  heroSubtitle: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#fff",
  },
  heroButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#FB6F92",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  valueSavings: {
    marginBottom: "40px",
    padding: "20px 20px 1px 20px",
    borderRadius: "16px",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  valuePacksSectionTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#FB6F92",
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
    color: "#FB6F92",
    fontWeight: "bold",
  },
  cta: {
    textAlign: "center",
    backgroundColor: "#FB6F92",
    borderRadius: "16px",
    overflow: "hidden",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  ctaWrap: {
    width: "100%",
    margin: "0 auto",
    padding: "30px 20px",
    backgroundImage: `url(${meshBackground})`,
    backgroundClip: "padding-box",
    backgroundSize: "cover", // Ensures the background image covers the entire container
    backgroundPosition: "center", // Centers the background image
    backgroundAttachment: "fixed", // Fixes the background image in place
  },
  ctaTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#fff",
  },
  ctaSubtitle: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#fff",
  },
  ctaButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#FB6F92",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  flavourImage: {
    borderRadius: "16px",
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
};

export default Landing;
