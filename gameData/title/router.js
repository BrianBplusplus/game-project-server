const { Router } = require("express");
const Title = require("./model");
const Category = require("../category/model");

const router = new Router();

router.get("/title/random", async (request, response, next) => {
  try {
    const randomTitle = await Title.findOne({
      include: [{ model: Category }],
      order: "random()"
    });
    return response.json(randomTitle);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
