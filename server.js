require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./database/connection");

const cardRoutes = require("./routes/card.routes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/cards", cardRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando");
});