const Category = require("./category/model");
const Title = require("./title/model");
const Room = require("../room/model");

const checkAndAddData = async () => {
  try {
    const categories = await Category.findAll();
    const titles = await Title.findAll();
    const rooms = await Room.findAll();

    if (categories.length && titles.length && rooms.length) {
      return;
    }
    await addCategoryData();
    await addTitleData();
    await addRoomData();
    console.log("Initial game data added");
  } catch (error) {
    console.error(error);
  }
};

const addCategoryData = () => {
  return Category.bulkCreate([
    { name: "testCategory1" },
    { name: "testCategory2" },
    { name: "testCategory3" }
  ]);
};

const addTitleData = () => {
  return Title.bulkCreate([
    { name: "testTitle1", categoryId: 1 },
    { name: "testTitle2", categoryId: 1 },
    { name: "testTitle3", categoryId: 2 }
  ]);
};

const addRoomData = () => {
  return Room.bulkCreate([
    { name: "testRoom1" },
    { name: "testRoom2" },
    { name: "testRoom3" }
  ]);
};

module.exports = checkAndAddData;
