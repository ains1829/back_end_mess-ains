const express = require("express");
const userRoutes = require("./src/routes/userRoutes");
const articleRoutes = require("./src/routes/articles/articleRoutes");
const cors = require("cors");
const mongoose = require("./src/config/db/mongo-config");
const app = express();

mongoose();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", userRoutes);
app.use("/api_article", articleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
);
