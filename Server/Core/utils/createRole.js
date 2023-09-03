const Role = require("../database/schemas/Role")

module.exports = async () => {
    const roles = new Set([
        {name : "Fondateur", grade : 1, default : false},
        {name : "Administrateur", grade : 2, default : false},
        {name : "Utilisateur", grade : 3, default : true},
    ])

    try {
        for(const roleData of roles) {
            const isExistingRole = await Role.findOne({name : roleData.name})
            if(isExistingRole) continue
            await Role.create(roleData)
        }
    }
    catch (e) {
        console.error(`Erreur lors de la création des roles : ${e}`);
    }
}
