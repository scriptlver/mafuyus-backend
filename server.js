require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/database/connection");

const cardRoutes = require("./src/routes/card.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/cards", cardRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando");
});