const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Card = require("../models/Card");

const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${sanitized}`);
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: 1 });
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar cards" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const name =
      req.body.name ||
      req.file.originalname.replace(/\.[^/.]+$/, "").replace(/_/g, " ");

    const card = await Card.create({
      name,
      image: req.file.filename,
    });

    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar card" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {};

    if (req.body.name) {
      updateData.name = req.body.name;
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const card = await Card.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar card" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: "Card deletado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar card" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Card.deleteMany();
    res.json({ message: "Todos os cards deletados" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar cards" });
  }
});

module.exports = router;