const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Environment variables load karo
dotenv.config();

// Database se connect karo
connectDB();

const app = express();

// Middlewares
app.use(express.json()); // JSON data read karne ke liye
app.use(express.urlencoded({ extended: true }));

// CORS setup (Client aur Admin dono ko allow karne ke liye)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Vite default ports
    credentials: true,
  }),
);

// Basic test route
app.get("/", (req, res) => {
  res.send("Aryavarta Travel API is running...");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/settings", settingsRoutes);

// Agar koi galat route hit kare toh error handle karna (baad mein add karenge)
// app.use(require("./middleware/errorHandler"));

// Server start karo
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
