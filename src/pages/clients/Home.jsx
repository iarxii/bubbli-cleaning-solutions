import React, { useState } from "react";

function Home() {
  // Mock value savings items
  const valueSavingsItems = [
    { id: 1, name: "Value Pack 1", price: "R29.99", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Value Pack 2", price: "R39.99", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Bundle Offer", price: "R49.99", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Cleaning Kit", price: "R59.99", image: "https://via.placeholder.com/150" },
  ];

  // Mock product data
  const mockProducts = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: (Math.random() * 50 + 10).toFixed(2),
    image: `https://via.placeholder.com/150?text=Product+${index + 1}`,
    category: index % 2 === 0 ? "Cleaning" : "Sanitizing",
  }));

  // State
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const itemsPerPage = 6;

  // Filtered and paginated products
  const filteredProducts = products.filter(
    (product) =>
      (filter === "All" || product.category === filter) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1>Welcome to Your Home Catalogue</h1>
        <p>Find all the cleaning and sanitizing products you need in one place!</p>
      </section>

      {/* Value Savings Section */}
      <section style={stylesVS.valueSavings}>
        <h2 style={stylesVS.sectionTitle}>Value Savings</h2>
        <div style={stylesVS.scrollContainer}>
          {valueSavingsItems.map((item) => (
            <div key={item.id} style={stylesVS.card}>
              <img src={item.image} alt={item.name} style={stylesVS.cardImage} />
              <h3 style={stylesVS.cardTitle}>{item.name}</h3>
              <p style={stylesVS.cardPrice}>{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search and Filter Section */}
      <section style={styles.filterSection}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
        <select value={filter} onChange={handleFilterChange} style={styles.dropdown}>
          <option value="All">All Categories</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Sanitizing">Sanitizing</option>
        </select>
      </section>

      {/* Product Catalogue */}
      <section style={styles.grid}>
        {paginatedProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.productImage} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button style={styles.addToCartButton} onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <section style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              ...styles.pageButton,
              backgroundColor: currentPage === index + 1 ? "#007BFF" : "#f0f0f0",
              color: currentPage === index + 1 ? "#fff" : "#000",
            }}
          >
            {index + 1}
          </button>
        ))}
      </section>
    </div>
  );
}

// Styles
const styles = {
  hero: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    marginBottom: "20px",
  },
  filterSection: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    padding: "0 20px",
  },
  searchInput: {
    flex: 1,
    marginRight: "10px",
    padding: "10px",
    fontSize: "16px",
  },
  dropdown: {
    padding: "10px",
    fontSize: "16px",
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
  addToCartButton: {
    backgroundColor: "#007BFF",
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
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

const stylesVS = {
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

export default Home;
