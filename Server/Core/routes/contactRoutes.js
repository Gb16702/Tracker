const express = require("express");
const sendGrid = require("@sendgrid/mail");
const Subject = require("../database/schemas/Subject");

const router = express.Router();

router.post("/api/contact", async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Méthode non autorisée" });

  const { email, category, message } = req.body;

  if (
    email === "" ||
    category === "" ||
    message === "" ||
    !email ||
    !category ||
    !message
  )
    return res
      .status(400)
      .json({ message: "Veuillez remplir tous les champs" });

  const subject = await Subject.findById(category);

  if (!subject) return res.status(404).json({ message: "Sujet introuvable" });

  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

  const mail = {
    to: process.env.FOUNDER,
    from: email,
    templateId: "d-d24bdb154d0941719fa7a94d86eb99d4",
    dynamic_template_data: {
      subject: subject.category,
      message,
    },
  };

  try {
    await sendGrid.send(mail),
    res.status(200).send({ message: "Mail envoyé !" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});



module.exports = router
