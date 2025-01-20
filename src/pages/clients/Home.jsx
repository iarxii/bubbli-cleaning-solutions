import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStore } from "@fortawesome/free-solid-svg-icons";

// import components
import ValuePacks from "../components/ValuePacks";
import ErrorBoundary from "../components/utils/ErrorBoundary"; // debugging

// import media
import placholder from "../../assets/placeholder-productimg.jpg";
import savingsTreeIcon from "../../assets/icons/icons8-growing-money-100-green.png";
import meshBackground from "../../assets/brand/mesh-white-0_7.png";
import meshBackgroundRed from "../../assets/brand/mesh-red-1.png";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

function Home() {
  // Mock product data
  const mockProducts = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    currency: "ZAR",
    currencySymbol: "R",
    price: (Math.random() * 50 + 10).toFixed(2),
    // image: `https://via.placeholder.com/150?text=Product+${index + 1}`,
    image: placholder,
    category: index % 2 === 0 ? "Cleaning" : "Sanitizing",
  }));

  console.log("mockProducts:", mockProducts); // debug

  // State
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const itemsPerPage = 12;

  // Filtered and paginated products
  const filteredProducts = products.filter(
    (product) =>
      (filter === "All" || product.category === filter) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  console.log("filteredProducts:", filteredProducts); // debug

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handlers
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ErrorBoundary>
      <div>
        {/* Hero Section */}
        <section style={styles.hero} className="grid gap-y-4 shadow-md">
          <h1 className="text-[#E44548]">Home Catalogue</h1>
          <p className="text-[#000000]">
            Find all the amazing cleaning and sanitizing products you need in one place!
          </p>
        </section>

        <section className="container mx-auto p-4">
          <div className="grid grid-cols-12 gap-4 items-start">
            
            {/* Value Savings Section */}
            <div className="col-span-12 rounded-lg bg-white p-6 pb-0 lg:col-span-8 shadow-md">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 justify-center">
                  <img src={savingsTreeIcon} 
                    alt="savings tree" 
                    style={{height: "auto", width: "100%", filter: "invert(0)"}} />
                </div>
                <div className="col-span-10 gap-y-4">
                  <h1 className="mb-2 text-xl font-bold text-[#E44548]">Get a Value Pack to save on your home sanitation.</h1>
                  <p className="text-[#000000]">We offer a mix of well-known brands that you trust as well as our own Flavours of Clean 😶‍🌫️🫧🧼🧽🪥🧹</p>
                </div>
              </div>
              
            
              
              <ValuePacks />
            </div>

            {/* Community Rewards Subscription */}
            <div className="col-span-12 rounded-lg p-0 shadow-md lg:col-span-4 self-start" 
              style={styles.subscribeCTA}>
                <div style={styles.subscribeCTAWrap}>
                  <h1 className="mb-2 text-xl font-bold text-white">Subscribe Today!</h1>
                  <p className="mb-2 text-white">
                    Get your cleaning supplies conveniently delivered to your doorstep
                    every month. No need to travel and join the long queues.
                  </p>
                  <p className="text-white">
                    From as little as R150.00 p.m, get the Clean Home Pack delivered to you.
                  </p>
                  <Link to="/clients/subscribe" className="block mt-4 text-center bg-white text-[#E44548] py-2 px-4 rounded-lg">
                    Subscribe Now
                  </Link>
                </div>
            </div>
            
          </div>
        </section>

        <section className="container mx-auto">
          <span id="anchor-catalogue"></span>
          <section style={styles.filterContainer} className="">
            <h1 className="pb-4 pt-6 text-[#E44548] bg-white text-center"><FontAwesomeIcon icon={faStore} /> <span className="comfortaaz">Bubbli Store</span></h1>
            {/* Search and Filter Section */}
            <div style={styles.filterSection} className="flex items-center mb-0">
              <FontAwesomeIcon icon={faSearch} className="text-[#E44548] pr-2 h-6" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={styles.searchInput}
              />
              <select
                value={filter}
                onChange={handleFilterChange}
                style={styles.dropdown}
              >
                <option value="All">All Categories</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Sanitizing">Sanitizing</option>
              </select>
            </div>
          </section>

          {/* Product Catalogue */}
          <section className="glassmorphic py-4">
            <div className="h-2 w-12 bg-[#1EBA15] mx-auto my-2 rounded-xl"></div>
            <h2 className="text-[#E44548] text-center">Product Catalogue</h2>
            <hr className="mt-4" />
            <div style={styles.grid}>
              {paginatedProducts.map((product) => (
                <div key={product.id} style={styles.card} className="shadow-md">
                  <Link to={`/clients/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={styles.productImage}
                    />
                  </Link>
                  <h3 style={styles.productCardTitle}>{product.name}</h3>
                  <p style={styles.productCardPrice}>{product.currencySymbol} {product.price}</p>
                  <button
                    style={styles.addToCartButton}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div style={styles.pagination} className="mb-6">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className="shadow-md"
                  onClick={() => handlePageChange(index + 1)}
                  style={{
                    ...styles.pageButton,
                    backgroundColor:
                      currentPage === index + 1 ? "#E44548" : "#f0f0f0",
                    color: currentPage === index + 1 ? "#fff" : "#000",
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </section>

          

        </section>
      </div>
    </ErrorBoundary>
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
  filterContainer: {
    position: "sticky",
    top: "0",
    zIndex: "10",
  },
  filterSection: {
    backgroundColor: "#f7f7f7",
    display: "flex",
    justifyContent: "space-between",
    // marginBottom: "20px",
    padding: "20px",
  },
  searchInput: {
    flex: 1,
    marginRight: "10px",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#d1d1d1",
    color: "#000",
  },
  dropdown: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#d1d1d1",
    color: "#000",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  productCardTitle: {
color: "#E44548",
fontSize: "24px",
  },
productCardPrice: {
 color: "#000",
 fontSize: "18px",
},
  addToCartButton: {
    backgroundColor: "#E44548",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    gap: "10px",
  },
  pageButton: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "20px",
  },
  subscribeCTA: {
    backgroundColor: "#E44548",
    height: "100%",
    width: "100%",
  },
  subscribeCTAWrap: {
    padding: "20px",
    backgroundImage: `url(${meshBackground})`,
    backgroundClip: "padding-box",
    backgroundSize: "cover", // Ensures the background image covers the entire container
    backgroundPosition: "center", // Centers the background image
    height: "100%",
    width: "100%",
  },
};

const styles_VS = {
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

const styles_Grid = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
  },
  Container8: {
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
  Container4: {
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
};

export default Home;
