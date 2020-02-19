const express = require("express");
const Room = require("./model");
const User = require("../user/model");
const Message = require("../message/model");
const authenticationMiddleware = require("../authentication/middleware");

function factory(stream) {
  const { Router } = express;
  const router = Router();

  router.post("/room", async (request, response, next) => {
    try {
      console.log(request.body.name);
      const newRoom = await Room.create({ name: request.body.name });
      const room = await Room.findByPk(newRoom.id, {
        include: [User, Message] //I edited this, if it breaks looks here
      });

      const action = {
        type: "ONE_ROOM",
        payload: room
      };

      const json = JSON.stringify(action);

      stream.send(json);
      response.send(json);
    } catch (error) {
      next(error);
    }
  });

  router.put(
    "/room/join",
    authenticationMiddleware,
    async (request, response, next) => {
      const { roomId } = request.body;
      try {
        const updatedUser = await User.update(
          { roomId },
          { where: { id: request.user.id }, returning: true, plain: true }
        );

        const updatedRoom = await Room.findByPk(roomId, {
          include: [User]
        });

        const action = {
          type: "JOIN_ROOM",
          payload: updatedRoom
        };

        const json = JSON.stringify(action);
        stream.send(json);

        response.send(updatedRoom);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
}

module.exports = factory;
