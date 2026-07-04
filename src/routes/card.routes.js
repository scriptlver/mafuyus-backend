const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const Card = require("../models/Card");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "mafuyus" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

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
    if (!req.file) {
      return res.status(400).json({ error: "Imagem não enviada" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const name =
      req.body.name ||
      req.file.originalname.replace(/\.[^/.]+$/, "").replace(/_/g, " ");

    const card = await Card.create({
      name,
      image: result.secure_url,
      imagePublicId: result.public_id,
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
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.image = result.secure_url;
      updateData.imagePublicId = result.public_id;
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
    const card = await Card.findById(req.params.id);

    if (card && card.imagePublicId) {
      await cloudinary.uploader.destroy(card.imagePublicId);
    }

    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: "Card deletado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar card" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const cards = await Card.find();

    for (const card of cards) {
      if (card.imagePublicId) {
        await cloudinary.uploader.destroy(card.imagePublicId);
      }
    }

    await Card.deleteMany();
    res.json({ message: "Todos os cards deletados" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar cards" });
  }
});

module.exports = router;