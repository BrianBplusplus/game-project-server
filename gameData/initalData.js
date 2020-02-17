const Category = require("./category/model");
const Title = require("./title/model");

const checkAndAddData = async () => {
  try {
    const categories = await Category.findAll();
    const titles = await Title.findAll();

    if (categories.length && titles.length) {
      return;
    }
    await addCategoryData();
    await addTitleData();
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

module.exports = checkAndAddData;
