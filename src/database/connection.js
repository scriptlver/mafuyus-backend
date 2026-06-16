const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo conectado");
  } catch (error) {
    console.error("Erro Mongo:");
    console.error(error);
  }
}

module.exports = connectDB;
