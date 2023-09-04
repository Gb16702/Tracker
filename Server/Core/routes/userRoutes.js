const express = require("express");
const User = require("../database/schemas/User");
const Role = require("../database/schemas/Role");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "../../../.env"),
});
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const sendGrid = require("@sendgrid/mail");
const VerificationToken = require("../database/schemas/VerificationToken");
const Token = require("../database/schemas/Token");
const { emailPattern, usernamePattern } = require("../utils/patterns");
const cloudinary = require("cloudinary").v2;
const cloudConfig = require("../utils/cloudConfig");
const checkUpload = require("../utils/checkUpload");

cloudinary.config(cloudConfig);

const router = express.Router();

router.post("/api/users", async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).send({ message: "Méthode non autorisée" });

  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword)
    return res.status(400).send({ message: "Requête invalide" });

  if (
    password !== confirmPassword ||
    password == username ||
    usernamePattern().test(email) ||
    username.length < 2 ||
    username.length > 24 ||
    !emailPattern().test(email)
  )
    return res.status(400).send({ message: "Requête invalide" });

  if (await User.findOne({ email }))
    return res
      .status(403)
      .send({ message: "Cet email est déjà associée à un compte" });

  const defaultRole = await Role.findOne({ default: true });

  let userRole = defaultRole._id;

  if (email === process.env.FOUNDER) {
    const founderRole = await Role.findOne({ name: "Fondateur" });
    userRole = founderRole._id;
  }

  const slug = username
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

  try {
    let userPassword = password;

    if (userPassword)
      userPassword = await argon.hash(userPassword, {
        type: argon.argon2id,
      });
    User.create({
      username,
      slug,
      email,
      password: userPassword,
      roles: [userRole],
    });

    res.status(200).send({ message: "Compte créé avec succès" });
  } catch (e) {
    res.status(500).send(`Erreur : ${e}`);
  }
});

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(`Erreur : ${e}`);
  }
});

router.delete("/api/users/:id", async (req, res) => {
  try {
    if (req.method !== "DELETE")
      return res.status(405).send("Méthode non autorisée");

    if (!req.query) {
      const id = req.params.id;
      const password = req.body.password;

      if (!id || !password) return res.status(400).send("Requête invalide");

      let user = await User.findOne({ _id: id });

      if (!user) {
        return res.status(404).send("Le compte n'existe pas (ou plus)");
      }

      const isPasswordValid = argon.verify(user.password, password);

      if (!isPasswordValid)
        return res.status(401).send("Mot de passe invalide");

      user = await User.findByIdAndDelete(id);

      res.clearCookie("errorMessage");

      return res.status(200).send({ message: "Compte supprimé avec succès" });
    } else {
      if (req.query.image) {
        await cloudinary.uploader.destroy(req.query.image);
        return res.status(200).send({ message: "Image supprimée avec succès" });
      }
    }
  } catch (e) {
    return res.status(500).send(`Erreur : ${e}`);
  }
});

router.patch("/api/users/:id", async (req, res) => {
  if (req.method !== "PATCH")
    return res.status(405).send("Méthode non autorisée");

  const { id } = req.params,
    { username } = req.body;

  if (!id || !username) return res.status(400).send("Requête invalide");

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { username },
      { new: true }
    );

    if (!user) return res.status(404).send("Le compte n'existe pas (ou plus)");
    else return res.status(200).send({ message: "Compte modifié avec succès" });
  } catch (e) {
    return res.status(500).send(`Erreur : ${e}`);
  }
});

router.post("/api/users/:id", async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).send("Méthode non autorisée");

  console.log("OK");

  const { id } = req.params,
    { email } = req.body;

  if (!id || !email) return res.status(400).send("Requête invalideeee");

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).send("Le compte n'existe pas (ou plus)");
    }

    const token = jwt.sign({ id: user._id }, process.env.NEXTAUTH_SECRET, {
      expiresIn: "1h",
    });

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

    let templateId, templateData;

    if (req.body.username) {
      templateId = "d-413c517499164ecea9087ea5ea067c10";
      templateData = {
        url: `${process.env.NEXT_PUBLIC_API_URL}/${user.slug}/reset-password/${token}`,
        username: user.username,
      };
    } else {
      templateId = "d-69851eaa132345c382383cc8bf0c6d5a";
      templateData = {
        url: `${process.env.NEXT_PUBLIC_API_URL}/${user.slug}/reset-email/${token}`,
        username: user.username,
      };
    }

    const mail = {
      to: "delgeoffrey1@gmail.com",
      from: "delgeoffrey1@gmail.com",
      templateId: templateId,
      dynamic_template_data: templateData,
    };

    await sendGrid.send(mail);

    console.log(mail);

    if (!req.body.username) {
      const isExistingEmailToken = await VerificationToken.findOne({
        User: user._id,
        type: "email",
      });
      if (isExistingEmailToken) {
        res.status(403).send("Un email de réinitialisation a déjà été envoyé");
      } else {
        const newEmailToken = await VerificationToken.create({
          User: user._id,
          token,
          type: "email",
        });
        return res.status(200).send({
          message: "Token envoyé avec succès",
          token: newEmailToken.token,
        });
      }
    } else {
      const isExistingPasswordToken = await VerificationToken.findOne({
        User: user._id,
        type: "password",
      });
      if (isExistingPasswordToken) {
        res.status(403).send("Un email de réinitialisation a déjà été envoyé");
      } else {
        const newPasswordToken = await VerificationToken.create({
          User: user._id,
          token,
          type: "password",
        });
        return res.status(200).send({
          message: "Token envoyé avec succès",
          token: newPasswordToken.token,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

router.patch("/api/users/:id/reset-email", async (req, res) => {
  if (req.method !== "PATCH")
    return res.status(405).send("Méthode non autorisée");

  const { id } = req.params,
    { email, password, token } = req.body;

  if (!id || !email || !password || !token)
    return res.status(400).send("Requête invalide");

  try {
    const isExistingEmail = await User.findOne({ email });
    if (isExistingEmail)
      return res.status(403).send("Cet email est déjà associée à un compte");
    const user = await User.findOne({ _id: id }),
      emailToken = await VerificationToken.findOne({
        token,
        User: user._id,
        type: "email",
      });

    if (!user || !VerificationToken)
      return res.status(404).send({
        message: `${
          !user
            ? "Le compte n'existe pas (ou plus)"
            : "Le token n'existe pas (ou plus)"
        }`,
      });

    if (
      !(await argon.verify(user.password, password, {
        type: argon.argon2id,
      }))
    )
      return res.status(401).send({ message: "Mot de passe invalide" });

    await Promise.all([
      User.findOneAndUpdate({ _id: id }, { email }, { new: true }),
      VerificationToken.findOneAndDelete({
        token,
        User: user._id,
        type: "email",
      }),
    ]);

    return res.status(200).send({ message: "Email modifiée avec succès" });
  } catch (e) {
    return res.status(500).send({ message: "Erreur" });
  }
});

router.patch("/api/users/:id/reset-password", async (req, res) => {
  if (req.method !== "PATCH")
    return res.status(405).send("Méthode non autorisée");

  const { id } = req.params,
    { password, newPassword, token } = req.body;

  if ((!id || !password || !newPassword, !token))
    return res.status(400).send("Requête invalide");

  try {
    const user = await User.findOne({ _id: id }),
      passwordToken = await VerificationToken.findOne({
        token,
        User: user._id,
        type: "password",
      });

    if (!user || !passwordToken)
      return res.status(404).send({
        message: `${
          !user
            ? "Le compte n'existe pas (ou plus)"
            : "Le token n'existe pas (ou plus)"
        }`,
      });

    if (
      !(await argon.verify(user.password, password, {
        type: argon.argon2id,
      }))
    )
      return res.status(401).send({ message: "Mot de passe invalide" });

    const newPasswordHashed = await argon.hash(newPassword, {
      type: argon.argon2id,
    });

    await Promise.all([
      User.findOneAndUpdate(
        { _id: id },
        { password: newPasswordHashed },
        { new: true }
      ),
      VerificationToken.findOneAndDelete({
        token,
        User: user._id,
        type: "password",
      }),
    ]);

    return res
      .status(200)
      .send({ message: "Mot de passe modifié avec succès" });
  } catch (e) {
    return res.status(500).send({ message: "Erreur" });
  }
});

router.delete("/api/users/:id/token", async (req, res) => {
  if (req.method !== "DELETE")
    return res.status(405).send("Méthode non autorisée");

  const { id } = req.params,
    { token } = req.body;

  if (!id || !token) return res.status(400).send("Requête invalide");

  const user = await User.findOne({ _id: id });

  try {
    await Token.findOneAndDelete({ token, User: user._id });
  } catch (e) {
    console.log(e);
  }
});

router.patch("/api/users/:id/image", async (req, res) => {
  if (req.method !== "PATCH")
    return res.status(405).send({ message: "Méthode non autorisée" });

  const { image } = req.body,
    { id } = req.params;

  if (!image || !id)
    return res.status(400).send({ message: "Requête invalide" });

  const { error } = checkUpload(image);

  if (error) return res.status(400).send({ message: error });

  try {
    const user = await User.findOne({ _id: id });
    if (!user)
      return res.status(404).send({ message: "Utilisateur introuvable" });

    cloudinary.config(cloudConfig);
    const uploadedResponse = await cloudinary.uploader.upload(image, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    const imageToDestroy = user.avatar;

    await User.findOneAndUpdate(
      { _id: id },
      { avatar: uploadedResponse.secure_url },
      { new: true }
    );

    await cloudinary.uploader.destroy(imageToDestroy);

    return res.status(200).send({
      message: "Image modifiée avec succès",
      image: uploadedResponse.secure_url,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/api/users/:id/image", async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).send({ message: "Méthode non autorisée" });

  const { image } = req.body,
    { id } = req.params;

  if (!image || !id)
    return res.status(400).send({ message: "Requête invalide" });

  const { error } = checkUpload(image);

  if (error) return res.status(400).send({ message: error });

  try {
    const user = await User.findOne({ _id: id });
    if (!user)
      return res.status(404).send({ message: "Utilisateur introuvable" });

    cloudinary.config(cloudConfig);
    const uploadedResponse = await cloudinary.uploader.upload(image, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    await User.findOneAndUpdate(
      { _id: id },
      { avatar: uploadedResponse.secure_url },
      { new: true }
    );
    return res.status(200).send({
      message: "Image ajoutée avec succès",
      image: uploadedResponse.secure_url,
    });
  } catch (e) {
    console.log(e);
  }
});

router.patch("/api/user/roles", async (req, res) => {

    if(req.method !== "PATCH")
      return res.status(405).send({ message: "Méthode non autorisée" });

    const {role, uid} = req.body

    if (!role || !uid)
      return res.status(400).send({ message: "Requête invalide" });

    try {

      const user = await User.findOne({
        _id: uid
      })

      if(!user)
        return res.status(404).send({ message: "Utilisateur introuvable" });

      const roleToAssign = await Role.findOne({
        name: role
      })

      if(!roleToAssign)
        return res.status(404).send({ message: "Rôle introuvable" });

      if(roleToAssign.grade == 1) {
        return res.status(403).send({ message: "Vous ne pouvez pas assigner ce rôle" });
      }

      await User.findOneAndUpdate({_id: uid}, {
        roles: [roleToAssign._id]
      })

      return res.status(200).send({ message: "Rôle assigné avec succès" });
    }
    catch(e) {
      console.log(e);
    }
});

module.exports = router;
