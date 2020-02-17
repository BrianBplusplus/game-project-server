const User = require("../user/model");
const { toData } = require("./jwt");

async function authentication(request, response, next) {
  try {
    const authentication =
      request.headers.authorization && request.headers.authorization.split(" ");

    if (authentication && authentication[0] === "Bearer" && authentication[1]) {
      const data = toData(authentication[1]);
      const user = await User.findByPk(data.id);

      if (user) {
        request.user = user;
        return next();
      }
    }

    return response.status(400).send("You have to login to do this");
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
