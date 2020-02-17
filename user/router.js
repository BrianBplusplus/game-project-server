const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const { toJWT } = require("../authentication/jwt");

const router = new Router();

router.post("/user", async (request, response, next) => {
  try {
    const { email, password, userName } = request.body;

    if (email && password && userName) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      await User.create({ ...request.body, password: hashedPassword });
      return response.status(201).send("User created successfully");
    }

    return response.status(400).send("Please provide an email and password");
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return response
        .status(400)
        .send("This email address already has an account.");
    }
    return next(error);
  }
});

router.post("/login", async (request, response, next) => {
  try {
    const { userName, password } = request.body;
    const user = await User.findOne({ where: { userName: userName } });

    if (user) {
      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (passwordIsValid) {
        const token = toJWT({ id: user.id });
        return response.status(200).json({ token: token });
      }
    }
    return response
      .status(400)
      .send("Please provide a valid email and password");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
