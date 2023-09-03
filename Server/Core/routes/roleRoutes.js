const express = require("express");
const Role = require("../database/schemas/Role");
const router = express.Router();

router.get("/api/roles", async (req, res) => {
    if(req.method !== "GET")
        return res.status(405).send({message : "Méthode non autorisée"})
    const {grade} = req.query;
    if(!grade)
        return res.status(400).send({message : "Aucun grade fourni"})
    const roles = await Role.find({})
    if(!roles)
        return res.status(404).send({message : "Aucun rôle trouvé"})
    else {
        const filteredRoles = roles.filter(role => role.grade !== 1)
        if(grade === "1") {
            return res.status(200).send({roles})
        }
        else {
            return res.status(200).send({roles : filteredRoles})
        }
    }
})

module.exports = router;