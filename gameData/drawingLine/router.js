const express = require("express");
const DrawingLine = require("./model");
const Room = require("../../room/model");
const User = require("../../user/model");
const Message = require("../../message/model");

function factory(stream) {
  const { Router } = express;
  const router = Router();

  router.post("/drawing", async (request, response, next) => {
    try {
      const newDrawing = await DrawingLine.create(request.body);

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
