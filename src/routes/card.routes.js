const express = require("express");
const multer = require("multer");
const Card = require("../models/Card");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const card = await Card.create({
      image: req.file.filename,
    });

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao criar card",
    });
  }
});

module.exports = router;
