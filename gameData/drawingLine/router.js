const express = require("express");
const DrawingLine = require("./model");

function factory(stream) {
  const { Router } = express;
  const router = Router();

  router.post("/drawing", async (request, response, next) => {
    try {
      const newDrawing = await DrawingLine.create(request.body);

      // response.send(newDrawing);
      // const room = await Room.findByPk(newRoom.id, {
      //   include: [User]
      // });

      // const action = {
      //   type: "ONE_ROOM",
      //   payload: room
      // };

      // const json = JSON.stringify(action);

      // stream.send(json);
      response.send("hi");
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = factory;
