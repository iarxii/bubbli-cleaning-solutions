const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package
const authRoutes = require("./routes/auth");
const db = require("./config/db");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

// TIP: to define specific origins:
/* app.use(
  cors({
    origin: "http://localhost:5173", // Replace with specific frontend's origin
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  }),
); */

// Use auth routes
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
