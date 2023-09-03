const Token = require("../database/schemas/Token")
const jwt = require("jsonwebtoken")
const path = require("path")
const dotenv = require("dotenv").config({path : path.join(__dirname, "../../../.env")})
const bcrypt = require("bcrypt")

const generateToken = async () => {
    const tokenId = Math.random().toString(36).substring(2, 15)
    const expiration = Date.now() + 1000 * 60 * 60 * 24
    const token = jwt.sign({tokenId, expiration}, process.env.NEXTAUTH_SECRET)

    const isExistingToken = await Token.findOne({})

    if(!isExistingToken) {
        await Token.create({token, expiration})
    }

    setTimeout(async () => {
        await Token.deleteMany({})
        generateToken()
    }, 1000 * 60 * 60 * 24)

    return token
}

module.exports = generateToken;