const express = require("express");
const Room = require("./model");
const User = require("../user/model");

function factory(stream) {
  const { Router } = express;
  const router = Router();

  router.post("/room", async (request, response, next) => {
    try {
      const newRoom = await Room.create(request.body.name);
      const room = await Room.findByPk(newRoom.id, {
        include: [User]
      });

      const action = {
        type: "ONE_ROOM",
        payload: room
      };

      const json = JSON.stringify(action);

      stream.send(json);
      response.send(room);
    } catch (error) {
      next(error);
    }
  });
  return router;
}

module.exports = factory;
