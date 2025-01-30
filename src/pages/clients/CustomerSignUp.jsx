import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLegal,
  faStore,
  faFingerprint,
  faRegistered,
  faSignature,
  faUserPen,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";


function CustomerSignUp() {
  const navigate = useNavigate();

  // State to manage form inputs and error message
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
  });
  const [error, setError] = useState({
    message: "",
    status: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData,
      );
      console.log("auth/register response::. \n",response.data);
      // Handle successful registration (e.g., redirect to login page)
      setError({ message: "✔️ Registration successful", status: "success" });

      // Redirect to login page
      navigate("/clients/login");
    } catch (err) {
      console.error(err);
      setError({ message: "❌ Registration failed", status: "error" });
    }
  };

  return (
    <section className="glassmorphic h-full py-6">
      <div style={styles.container}>
        <div className="pt-4">
          <FontAwesomeIcon
            icon={faUserPen}
            className="size-20 text-[#FB6F92]"
          />
        </div>
        <h1 className="my-4" style={styles.inputLabel}>
          Sign Up for a <b>Bubbli</b> account, it's <b>free</b>!
        </h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* fname */}
          <div style={styles.inputGroup}>
            <label htmlFor="firstName" style={styles.inputLabel}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              style={styles.input}
            />
          </div>
          {/* lname */}
          <div style={styles.inputGroup}>
            <label htmlFor="lastName" style={styles.inputLabel}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
              style={styles.input}
            />
          </div>
          {/* age */}
          <div style={styles.inputGroup}>
            <label htmlFor="age" style={styles.inputLabel}>
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
              style={styles.input}
            />
          </div>
          {/* gender */}
          <div style={styles.inputGroup}>
            <label htmlFor="gender" style={styles.inputLabel}>
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select your gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Trans">Trans</option>
            </select>
          </div>
          {/* contactNumber */}
          <div style={styles.inputGroup}>
            <label htmlFor="contactNumber" style={styles.inputLabel}>
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
              style={styles.input}
            />
          </div>
          {/* email */}
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.inputLabel}>
              Email (optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>
          {/* error/success output */}
          <div>
            <p
              style={error.status === "success" ? styles.success : styles.error}
            >
              {error.message}
            </p>
          </div>
          <button type="submit" style={styles.button} className="shadow-md">
            Sign Up
          </button>
        </form>

        <div className="my-4 flex justify-center gap-x-1 pt-4 text-center">
          <span className="text-[#777777]" style={{ fontSize: "0.6rem" }}>
            <FontAwesomeIcon icon={faLegal} className="me-1 size-5" />
            Please read our
            <Link to="#" className="mx-1 font-bold text-[#FB6F92]">
              Privacy Policy
            </Link>
            and
            <Link to="#" className="ms-1 font-bold text-[#FB6F92]">
              Terms of Service
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    // border: "1px solid #ccc",
    borderRadius: "16px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    textAlign: "left",
  },
  inputLabel: {
    color: "#FB6F92",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f7f7f7",
    color: "#000",
  },
  button: {
    padding: "10px",
    backgroundColor: "#FB6F92",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  success: {
    color: "green",
    fontWeight: "bold",
  },
};

export default CustomerSignUp;
