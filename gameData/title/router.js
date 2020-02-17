const { Router } = require("express");
const Sequelize = require("sequelize");
const Title = require("./model");
const Category = require("../category/model");

const router = new Router();

router.get("/title/random", async (request, response, next) => {
  try {
    const randomTitle = await Title.findOne({
      include: [{ model: Category }],
      order: [[Sequelize.fn("RANDOM")]]
    });
    return response.json(randomTitle.dataValues);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
