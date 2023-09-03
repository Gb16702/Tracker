const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config()

const connection = {};

const connect = async () => {
    if(connection.isConnected) {
        return console.log('Déjà connecté à mongoDB');
    }

    if(mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if(connection.isConnected === 1) {
            return console.log('Utilisation de la connexion existante');
        }
        await mongoose.disconnect();
    }

    const db = await mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Nouvelle connexion à mongoDB');
    connection.isConnected = db.connections[0].readyState;
}

const disconnect = async () => {
    if(connection.isConnected) {
        if(process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        }else{
            console.log('Impossible de se déconnecter en mode développement');
        }
    }
}

const convertDocToObj = doc => {
    doc._id = doc._id.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
    return doc;
}

const db = { connect, disconnect, convertDocToObj };

module.exports = db;


