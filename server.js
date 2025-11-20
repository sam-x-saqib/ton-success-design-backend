// server.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.tonsuccessdesign.com/",
      "https://tonsuccessdesign.com/",
    ],
  })
);

app.get("/", (req, res) => {
  res.send("🚀 Proxy server is running successfully!");
});

app.get("/api/googleProxy", async (req, res) => {
  const { endpoint, ...params } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/${endpoint}`,
      {
        params: {
          key: process.env.GOOGLE_MAPS_API_KEY,
          ...params,
        },
        headers: {
          "User-Agent": "Node.js Server",
          Referer: "",
        },
        validateStatus: () => true,
      }
    );

    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error.message);
    return res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Google Maps proxy server running on port ${PORT}`);
});
