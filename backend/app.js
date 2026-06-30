require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

require("./config/db");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Movie API Running...");
});

const PORT = process.env.PORT;

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const filmRoutes = require("./routes/filmRoutes");
app.use("/api/films", filmRoutes);

const seriesRoutes = require("./routes/seriesRoutes");
app.use("/api/series", seriesRoutes);

const userRoutes=require("./routes/userRoutes");
app.use("/api/users",userRoutes);

const favoriteRoutes=require("./routes/favoriteRoutes");
app.use("/api/favorites",favoriteRoutes);

const watchlistRoutes=require("./routes/watchlistRoutes");
app.use("/api/watchlist",watchlistRoutes);

const commentRoutes=require("./routes/commentRoutes");
app.use("/api/comments",commentRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});