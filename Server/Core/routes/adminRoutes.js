const express = require("express");
const Token = require("../database/schemas/Token");
const User = require("../database/schemas/User");
const argon = require("argon2");

const router = express.Router();

router.post("/admin", async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).send("Méthode non autorisée");

  if (!req.body) {
    return res.status(400).send("Requête invalide");
  }

  const { email, password, token } = req.body;

  if (!token || !email || !password)
    return res.status(400).send("Requête invalide");

  const user = await User.findOne({ email });

  if (!user) return res.status(404).send("Utilisateur introuvable");

  if (!user.roles.grade > 2) {
    return res
      .status(403)
      .send("Vous n'avez pas les droits pour accéder à cette ressource");
  }

  if (
    !(await argon.verify(user.password, password, {
      type: argon.argon2id,
    }))
  ) {
    return res.status(401).send({ message: "Echec de l'authentification" });
  }
  const jwt = await Token.findOne({ token });

  if (!jwt) return res.status(401).send("Token invalide");

  res.status(200).send({ message: "OK" });
});

router.get("/admin/users", async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).send({ message: "Méthode non autorisée" });

  const { page } = req.query;

  const itemsPerPage = 5;

  const paginatedUsers = await User.find({})
    .select("-password")
    .populate("roles", "name grade")
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .lean();

  const users = await User.find({})
    .select("-password")
    .populate("roles", "name grade")
    .lean();

  const count = await User.countDocuments({});

  res.status(200).send({
    paginatedUsers,
    users,
    totalPages: Math.ceil(count / itemsPerPage),
  });
});

router.delete("/admin/users/:id", async (req, res) => {
  if (req.method !== "DELETE")
    return res.status(405).send({ message: "Méthode non autorisée" });

  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "Requête invalide" });
  else {
    await User.findByIdAndRemove(id);
    return res.status(200).send({ message: "Compte supprimé avec succès" });
  }
});

router.get("/admin/users/:slug", async (req, res) => {
  const { slug } = req.params;

  const user = await User.findOne({ slug })
    .select("-password")
    .populate("roles", "name grade");
  res.status(200).send({ user });
});

router.get("/admin/allUsers", async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).send({ message: "Méthode non autorisée" });

  const { search } = req.query;

  let users

  if (search) {
    users = await User.find({
      $or: [{ username: { $regex: search, $options: "i" } }],
    })
      .select("-password")
      .populate("roles", "name")
      .lean();
  }
  else {
    users = await User.find({})
      .select("-password")
      .populate("roles", "name")
      .lean();
  }

  res.status(200).send({ users });
});

module.exports = router;
