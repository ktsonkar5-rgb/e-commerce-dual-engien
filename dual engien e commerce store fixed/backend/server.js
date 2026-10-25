require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const frontendPath = path.resolve(__dirname, "..");

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Dual Engine E-Commerce Backend is Running",
        database: mongoose.connection.readyState === 1
            ? "connected"
            : "disconnected"
    });
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.use("/css", express.static(path.join(frontendPath, "css"), {
    dotfiles: "deny"
}));
app.use("/js", express.static(path.join(frontendPath, "js"), {
    dotfiles: "deny"
}));

const frontendPages = {
    "/": "index.html",
    "/index.html": "index.html",
    "/product.html": "product.html",
    "/search.html": "search.html",
    "/admin-login.html": "admin-login.html",
    "/admin-dashboard.html": "admin-dashboard.html",
    "/api-config.js": "api-config.js",
    "/admin-login.js": "admin-login.js",
    "/admin-dashboard.js": "admin-dashboard.js",
    "/admin-login.css": "admin-login.css",
    "/admin-dashboard.css": "admin-dashboard.css"
};

app.get(Object.keys(frontendPages), (req, res) => {
    res.sendFile(path.join(frontendPath, frontendPages[req.path]));
});

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("SERVER STARTUP ERROR:", error.message);
        process.exit(1);
    }
}

startServer();
