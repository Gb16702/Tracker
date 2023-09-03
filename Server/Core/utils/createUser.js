const mongoose = require('mongoose');
const User = require('../database/schemas/User');
const Role = require('../database/schemas/Role');

module.exports = async userData => {
    try {
        const role = await Role.findOne({name : userData.role })
        if(!role) throw new Error(`Le role ${userData.role} n'existe pas`)

        const isExistingUser = await User.findOne({username: userData.username})
        if(isExistingUser) {
            throw new Error(`L'utilisateur ${userData.username} existe déjà`)
        }else{
            const newUser = new User({
                username: userData.username,
                email: userData.email,
                password: userData.password,
                roles: role._id,
                avatar: userData.avatar,
                status : userData.status,
                bio : userData.bio
            })

            await newUser.save()
        }
        console.log(`Utilisateur ${userData.username} créé avec succès`);
    }
    catch(err) {
        console.error(`Erreur lors de la création de l'utilisateur ${userData.username} : ${err}`);
    }
}