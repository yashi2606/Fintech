// const path = require("path");
// // Serve static frontend files
// app.use(express.static(path.join(__dirname, "../frontend")));

// // For any unknown route, serve index.html (for SPA or homepage fallback)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/index.html"));
// });

// const authRoutes = require('./routes/auth');
// app.use("/api/auth", authRoutes); // Now routes like /register and /login will work



const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// 🟡 Serve frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

