const express = require("express");

const router = express.Router();

const Testimonials = require("../database/schemas/Testimonials");

router.get("/api/testimonials", async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Méthode non autorisée" });

  const testimonials = await Testimonials.find({}).sort({ createdAt: -1 });

  if (!testimonials) {
    return res.status(404).json({ message: "Aucun témoignage trouvé" });
  }

  return res.status(200).send(testimonials);
});

router.post("/api/testimonials", async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Méthode non autorisée" });

  const { isLogged, username, title, message, rating, isAnonymous } = req.body;

  if (!title || !message || !rating)
    return res
      .status(400)
      .json({ message: "Veuillez remplir tous les champs" });

  const testimonialData = {
    title,
    content: message,
    rating,
  };

  if (isLogged) {
    if (!username) {
      return res
        .status(400)
        .json({ message: "Le nom d'utilisateur est requis" });
    }

    testimonialData.username = username;
    testimonialData.appearAsAnonymous = isAnonymous;
  }

  const testimonial = new Testimonials(testimonialData);

  await testimonial.save();

  return res.status(201).json({ message: "Merci pour votre témoignage" });
});

router.patch("/api/testimonials/:id", async (req, res) => {
  if (req.method !== "PATCH")
    return res.status(405).json({ message: "Méthode non autorisée" });

  const { id } = req.params,
    { isVisible } = req.body;

  if (!id || isVisible == undefined)
    return res.status(400).json({ message: "Erreur lors de la requête" });

  const testimonial = await Testimonials.findById(id);

  if (!testimonial)
    return res.status(404).json({ message: "Témoignage introuvable" });

  testimonial.isVisible = isVisible;

  await testimonial.save();

  return res.status(200).json({ message: "Visibilité du témoignage modifiée" });
});

router.get("/api/testimonials/published", async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Méthode non autorisée" });

  const testimonials = await Testimonials.find({ isVisible: true }).sort({
    createdAt: -1,
  });

  if (!testimonials)
    return res.status(404).json({ message: "Aucun témoignage trouvé" });

  return res.status(200).send(testimonials);
});

module.exports = router;
