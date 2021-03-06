const express = require("express");
const Room = require("../room/model");
const Message = require("./model");
const User = require("../user/model");
const DrawingLine = require("../gameData/drawingLine/model");

function factory(stream) {
  const { Router } = express;
  const router = Router();

  router.post("/message", async function(request, response, next) {
    try {
      console.log(request.body.message);
      const newMessage = await Message.create({
        message: request.body.message,
        roomId: request.body.roomId
      });

      const rooms = await Room.findAll({
        include: [User, Message, DrawingLine]
      });

      const action = {
        type: "ALL_ROOMS",
        payload: rooms
      };

      const json = JSON.stringify(action);

      stream.send(json);

      response.send(rooms);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = factory;
