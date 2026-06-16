const express = require("express");
const Card = require("../models/Card");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cards = await Card.find().sort({
      createdAt: -1,
    });

    res.json(cards);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar cards",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { image } = req.body;

    const card = await Card.create({
      image,
    });

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao criar card",
    });
  }
});

module.exports = router;
