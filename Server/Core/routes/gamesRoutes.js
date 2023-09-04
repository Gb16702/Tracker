const express = require("express");
const router = express.Router();

const Games = require("../database/schemas/Game");
const slugger = require("../utils/slugger");
const multer = require("multer");
const upload = multer();
const cloudinary = require("cloudinary").v2;
const cloudConfig = require("../utils/cloudConfig");
const checkUpload = require("../utils/checkUpload");
const fetch = require("node-fetch");
const seed = require("../utils/seed");
const Player = require("../database/schemas/Player");

router.get("/games", async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).send({ message: "Méthode non autorisée" });

  const games = await Games.find({});

  if(!games)
    return res.status(404).send({message : "TAucun jeu trouvé"})

  return res.status(200).send({ games });
});

router.post("/api/jeux", upload.none(), async (req, res) => {
  if (req.method != "POST")
    return res.status(405).send({ message: "Méthode non autorisée" });

  const { name, popularity, picture, banner } = req.body;

  if (!name || !popularity || !picture || !banner)
    return res.status(400).send({ message: "Requête invalide" });

  if (popularity > 10 || popularity < 0) {
    return res.status(400).send({ message: "La popularité est invalide" });
  }

  const isExistingGame = await Games.findOne({
    name,
  });

  if (isExistingGame)
    return res.status(409).send({ message: "Ce jeu existe déjà" });

  const { error: pictureError } = checkUpload(picture);
  const { error: bannerError } = checkUpload(banner, true);

  if (pictureError || bannerError)
    return res.status(400).send({ message: pictureError || bannerError });

  cloudinary.config(cloudConfig);

  const uploadedPictureResponse = await cloudinary.uploader.upload(picture, {
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });

  const uploadedBannerResponse = await cloudinary.uploader.upload(banner, {
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });

  try {
    const rand = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
    const data = await seed(rand);

    const player = data.map((d_) => ({
      _id: d_._id,
      username: d_.username,
      division: d_.division,
      avatar: d_.avatar,
      winRate: d_.winRate,
      matches: d_.matches,
    }));

    await Player.create(player);

    const newGame = await Games.create({
      name,
      slug: slugger(name),
      popularity,
      image: uploadedPictureResponse.secure_url,
      banner: uploadedBannerResponse.secure_url,
      players: player,
    });

    await newGame.save();

    return res.status(201).send({ message: "Jeu créé avec succès" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Erreur serveur" });
  }
});

router.patch("/api/jeu", upload.none(), async (req, res) => {
  try {
    const { statusUpdates, identifier } = req.body;

    for (const update of statusUpdates) {
      const existingGame = await Games.findById(identifier);

      if (!existingGame) {
        return res.status(404).json({ message: "Jeu non trouvé." });
      }

      const updatedFields = {};

      if (update.name && update.name !== existingGame.name) {
        updatedFields.name = update.name;
        updatedFields.slug = slugger(update.name);
      }

      if (update.popularity !== existingGame.popularity) {
        if (update.popularity > 10 || update.popularity < 0) {
          return res
            .status(400)
            .send({ message: "La popularité est invalide" });
        }
        updatedFields.popularity = update.popularity;
      }

      if (update.image) {
        const { error } = checkUpload(update.image, false);
        if (error) return res.status(400).send({ message: error });

        cloudinary.config(cloudConfig);
        const uploadedResponse = await cloudinary.uploader.upload(
          update.image,
          {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          }
        );

        updatedFields.image = uploadedResponse.secure_url;
      }

      if (update.banner) {
        const { error } = checkUpload(update.banner, true);
        if (error) return res.status(400).send({ message: error });

        cloudinary.config(cloudConfig);
        const uploadedResponse = await cloudinary.uploader.upload(
          update.banner,
          {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          }
        );

        updatedFields.banner = uploadedResponse.secure_url;
      }

      if (Object.keys(updatedFields).length > 0) {
        await Games.updateOne({ _id: identifier }, { $set: updatedFields });
      }
    }

    res.status(200).json({ message: "Mises à jour réussies." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
});

router.delete("/api/jeu", async (req, res) => {
  if (req.method !== "DELETE")
    return res.status(405).send({ error: "Méthode non autorisée" });

  const { state } = req.body;

  if (!state) {
    return res.status(400).send({ error: "Le state est obligatoire" });
  }

  try {
    for (const s_ of state) {
      const game = await Games.findOne({ name: s_ });

      if (!game) {
        return res.status(404).send({ error: `Le jeu ${s_} n'existe pas` });
      }

      const playerIds = game.players;

      for (const playerId of playerIds) {
        await Player.findByIdAndDelete(playerId);
      }

      await Games.findOneAndDelete({ name: s_ });
    }

    return res
      .status(200)
      .send({ message: "Jeux et joueurs supprimés avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: "Une erreur est survenue lors de la suppression" });
  }
});

router.get("/api/jeu/:slug/joueur/:id", async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).send({ message: "Méthode non autorisée" });

  const { slug, id } = req.params;

  console.log(slug, id);

  if (!slug || !id)
    return res.status(400).send({ message: "Requête invalide" });

  const game = await Games.findOne({ slug }).populate({
    path: "players",
    match: { _id: id },
    limit: 1,
  });

  if (!game) return res.status(404).send({ message: "Jeu introuvable" });

  const player = game.players[0];

  const similarPlayers = await Games.findOne({ slug }).populate({
    path: "players",
    match: {
      "division.elo": {
        $gte: player.division.elo - 200,
        $lte: player.division.elo + 200,
      },
    },
    limit: 4,
  });

  const similarPlayers_ = similarPlayers.players.filter((p) => p._id != id);

  return res
    .status(200)
    .send({ player, similarPlayers: similarPlayers_, banner: game.banner });
});

router.get("/api/jeu/:slug/allUsers", async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).send({ message: "Méthode non autorisée" });

  let users, game;

  const { slug } = req.params;
  const { search } = req.query;

  if (!search || search === "") {
    game = await Games.findOne({ slug })
      .populate({
        path: "players",
        limit: 20,
      })
      .limit(10)
      .lean();
  } else {
    game = await Games.findOne({ slug })
      .populate({
        path: "players",
        match: { username: { $regex: search, $options: "i" } },
        limit: 10,
      })
      .lean();
  }
  users = game.players;

  return res.status(200).send({ users });
});

router.get("/api/jeu/:slug", async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).send({ message: "Méthode non autorisée" });

  const { slug } = req.params;

  console.log(req.query);

  const itemsPerPage = req.query.records || 10;

  const game = await Games.findOne({ slug }).populate("players");

  const paginatedPlayers = await Games.findOne({ slug })
    .populate({
      path: "players",
      options: {
        sort: { "division.elo": -1 },
        skip: (req.query.page - 1) * itemsPerPage,
        limit: itemsPerPage,
      },
    })
    .lean();

  if (!game) return res.status(404).send({ message: "Jeu introuvable" });

  const rankedPlayers = paginatedPlayers.players.map((p_, index) => ({
    ...p_,
    rank: index + 1 + (req.query.page - 1) * itemsPerPage,
  }))

  const count = game.players.length;

  return res.status(200).send({
    game,
    totalPages: Math.ceil(count / itemsPerPage),
    paginatedPlayers : {
      ...paginatedPlayers,
      players : rankedPlayers
    }
  });
});

module.exports = router;
