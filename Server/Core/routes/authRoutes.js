const express = require("express");
const User = require("../database/schemas/User");
const Code = require("../database/schemas/Code");
const Token = require("../database/schemas/Token");
const argon = require("argon2");
const sendGrid = require("@sendgrid/mail");
const router = express.Router();

router.post("/login", async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Méthode non autorisée" });
  }

  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Requête invalide" });
  }

  const user = await User.findOne({ email }).populate("roles", "name grade");

  if (!user) {
    return res.status(404).send({ message: "Utilisateur introuvable" });
  }

  try {
    const isPasswordValid = await argon.verify(user.password, password, {
      type: argon.argon2id,
    });
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Echec de l'authentification" });
    }

    const { password: _, ...userWithoutPassword } = user.toObject();
    return res.status(200).send({ userWithoutPassword });
  } catch (error) {
    return res.status(500).send({ message: "Erreur interne du serveur" });
  }
});

const deleteExpiredCode = async () => {
  const now = Date.now();
  await Code.deleteMany({ expiration: { $lt: now } });
};

setInterval(deleteExpiredCode, 1000 * 60);

router.get("/getCode", async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).send({ message: "Méthode non autorisée" });

  if (!req.query.email)
    return res.status(400).send({ message: "Requête invalide" });

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9{2,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailPattern.test(req.query.email))
    return res.status(400).send({ message: "Requête invalide" });

  let user = await User.findOne({ email: req.query.email }).populate(
    "roles",
    "grade"
  );
  user.toObject();

  if (!user)
    return res.status(404).send({ message: "Utilisateur introuvable" });
  else if (user.roles.grade > 2) {
    return res.status(403).send({
      message: "Vous n'avez pas la permission d'effectuer cette action",
    });
  }

  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

  const code = new Code({
    User: user._id,
    value: Math.floor(Math.random() * 1000000),
    expiration: Date.now() + 600000,
    isUsed: false,
  });

  const mail = {
    to: req.query.email,
    from: process.env.FOUNDER,
    templateId: "d-de5ebccee688482bb68dbf2000acad84",
    dynamic_template_data: {
      code: code.value,
      username: user.username,
    },
  };

  try {
    await sendGrid.send(mail);
    await code.save();
    res.status(200).json(code);
  } catch (e) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/verifyCode", async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).send({ message: "Méthode non autorisée" });

  if (!req.query) {
    const { email, input } = req.body;

    if (!email || !input)
      return res.status(400).send({ message: "Requête invalide" });

    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9{2,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailPattern.test(email))
      return res.status(400).send({ message: "Requête invalide" });

    const code = await Code.findOne({
      value: input,
      expiration: { $gt: Date.now() },
      isUsed: false,
    }).populate("User");

    if (!code) return res.status(404).send({ message: "Code introuvable" });

    const expirationDate = new Date(code.expiration).toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
    });

    if (expirationDate < Date.now()) return res.status(401).send("Code expiré");

    const token = await Token.findOne({});

    try {
      if (token) return res.status(200).json({ token });
      else {
        return res.status(404).send({ message: "Token introuvable" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Une erreurddd est surevenue" });
    }
  } else {
    const code = await Code.findOne({
      value: req.body.code,
      expiration: { $gt: Date.now() },
      isUsed: false,
    }).populate("User");

    if (!code) return res.status(404).send({ message: "Code introuvable" });

    const expirationDate = new Date(code.expiration).toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
    });

    if (expirationDate < Date.now()) return res.status(401).send("Code expiré");

    return res.status(200).json({ message: "Code valide" });
  }
});

router.post("/auth/forgot-password", async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).send({ message: "Méthode non autorisée" });

  const { email } = req.body;

  if (!email) return res.status(400).send({ message: "Requête invalide" });

  const user = await User.findOne({
    email,
  });

  if (!user)
    return res.status(404).send({ message: "Une erreur est survenue" });

  const code = new Code({
    User: user._id,
    value: Math.floor(Math.random() * 1000000),
    expiration: Date.now() + 600000,
    isUsed: false,
  });

  const mail = {
    to: email,
    from: process.env.FOUNDER,
    templateId: "d-de5ebccee688482bb68dbf2000acad84",
    dynamic_template_data: {
      code: code.value,
      username: user.username,
    },
  };

  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await sendGrid.send(mail);
    await code.save();
    res.status(200).send({
      message: "Un email a été envoyé à " + email,
      code: code.value,
    });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.patch("/password", async (req, res) => {
  if (req.method !== "PATCH")
    return res.status(405).send({ message: "Méthode non autorisée" });

  const { password, email } = req.body;

  if (!password || !email)
    return res.status(400).send({ message: "Requête invalide" });

  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).send({ message: "Utilisateur introuvable" });

  try {
    const hashedPassword = await argon.hash(password, { type: argon.argon2id });
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    await Code.findOneAndUpdate({ User: user._id }, { isUsed: true });

    return res
      .status(200)
      .send({ message: "Mot de passe modifié avec succès !" });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
