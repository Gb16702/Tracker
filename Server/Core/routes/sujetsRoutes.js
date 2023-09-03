const express = require("express");
const router = express.Router();

const Subject = require("../database/schemas/Subject");

router.get("/api/sujets", async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).send({ error: "Méthode non autorisée" });

  const sujets = await Subject.find({}).sort({ createdAt: -1 });

  if (!sujets) {
    return res.status(404).send({ error: "Aucun sujet trouvé" });
  }

  res.status(200).send(sujets);
});

router.post("/api/sujets", async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).send({ error: "Méthode non autorisée" });

  const { category } = req.body;

  if (!category) {
    return res.status(400).send({ error: "La catégorie est obligatoire" });
  }

  const sujet = new Subject({
    category,
  });

  await sujet.save();

  res.status(201).send("Sujet créé avec succès");
});

router.delete("/api/sujet", async (req, res) => {
  if (req.method !== "DELETE")
    return res.status(405).send({ error: "Méthode non autorisée" });

  const { state } = req.body;

  if (!state) {
    return res.status(400).send({ error: "Le state est obligatoire" });
  }

  state.map(async (s_) => {
    try {
      await Subject.findOneAndDelete({
        category: s_,
      });
    } catch (e) {
      console.error(e);
    }
  });

  res.status(200).send({ message: "Opération effectuée avec succès" });
});

router.patch("/api/sujet", async (req, res) => {
  if (req.method !== "PATCH") {
    return res.status(405).send({ error: "Méthode non autorisée" });
  }

  const { statusUpdates, identifier } = req.body;

  if (!statusUpdates || !identifier) {
    return res.status(400).send({ error: "Requête invalide" });
  }

  try {
    const existingSubject = await Subject.findById(identifier);
    if (!existingSubject) {
      return res.status(404).send({ error: "Sujet non trouvé" });
    }

    for (const update of statusUpdates) {
      await Subject.updateOne(
        { _id: identifier },
        { $set: { category: update.category } }
      );
    }

    res.status(200).send({ message: "Modification effectuée avec succès" });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Erreur lors de la modification" });
  }
});

module.exports = router;
