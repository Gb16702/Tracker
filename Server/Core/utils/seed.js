const { faker } = require("@faker-js/faker");
const getImageDirectory = require("./getImageDirectory");
const cloudinary = require("cloudinary").v2;
const cloudConfig = require("./cloudConfig");
const path = require("path");

const seed = async (number) => {
  let newPlayers = [];

  cloudinary.config(cloudConfig);

  const defaultAvatars = getImageDirectory();

  const divisions = [
    { name: "Bronze", elo: 0, image: defaultAvatars[8] },
    { name: "Silver", elo: 500, image: defaultAvatars[14] },
    { name: "Gold", elo: 1000, image: defaultAvatars[10] },
    { name: "Platinum", elo: 1500, image: defaultAvatars[12] },
    { name: "Diamond", elo: 2000, image: defaultAvatars[9] },
    { name: "Immortal", elo: 2500, image: defaultAvatars[11] },
    { name: "Radiant", elo: 3000, image: defaultAvatars[13] },
  ].sort((a, b) => a.elo - b.elo);

  const divisionImages = [];
  for (const d of divisions) {
    const uploadedImage = await cloudinary.uploader.upload(
      path.join(__dirname, "../../public/images", d.image),
      {
        folder: "divisions",
      }
    );
    divisionImages.push({ divisionName: d.name, imageUrl: uploadedImage.secure_url });
  }

  for (let i = 0; i < number; i++) {
    const randomElo = faker.number.int({ min: 0, max: 3500 });
    let i = divisions.length - 1;
    while (i > 0 && divisions[i].elo > randomElo) {
      i--;
    }
    const division = divisions[i];

    const divisionImage = divisionImages.find(img => img.divisionName === division.name);

    let newPlayer = {
      _id: faker.database.mongodbObjectId(),
      username: faker.internet.userName(),
      division: {
        name: division.name,
        elo: randomElo,
        image: divisionImage.imageUrl,
      },
      avatar: faker.image.avatar(),
      winRate: faker.number.int({ min: 0, max: 100 }),
      matches: faker.number.int({ min: 0, max: 100 }),
    };
    newPlayers.push(newPlayer);
  }

  return newPlayers;
};

module.exports = seed;
