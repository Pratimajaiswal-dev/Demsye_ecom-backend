const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Health Check API
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Demsye Ecommerce Backend is Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});