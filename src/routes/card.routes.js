const express = require("express");
const multer = require("multer");
const Card = require("../models/Card");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    cb(null, Date.now() + "-" + sanitized);
  },
});

router.get("/", async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: 1 });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cards" });
  }
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const card = await Card.create({
      image: req.file.filename,
    });
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar card" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: "Card deletado" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar card" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Card.deleteMany();
    res.json({ message: "Todos os cards deletados" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar cards" });
  }
});

module.exports = router;
