const fs = require('fs')
const path = require('path')

const getImageDirectory = () => {
    let defaultAvatars = []

    const directory = path.join(__dirname, "../../public/images")

    fs.readdirSync(directory).forEach(file => {
        defaultAvatars.push(file)
    })

    return defaultAvatars;
}

module.exports = getImageDirectory;
