const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const Sse = require("json-sse");
const roomFactory = require("./room/router");
const messageFactory = require("./message/router");

const cors = require("cors");
const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const userRouter = require("./user/router");
app.use(userRouter);

const Category = require("./gameData/category/model");
const Title = require("./gameData/title/model");
const Room = require("./room/model");
const checkAndAddData = require("./gameData/initalData");
checkAndAddData();

const titleRouter = require("./gameData/title/router");
app.use(titleRouter);

const User = require("./user/model");
const Message = require("./message/model");

const stream = new Sse();
app.get("/stream", async (request, response, next) => {
  try {
    const rooms = await Room.findAll({ include: [User, Message] });

    const action = {
      type: "ALL_ROOMS",
      payload: rooms
    };

    const json = JSON.stringify(action);
    stream.updateInit(json);
    stream.init(request, response);
  } catch (error) {
    next(error);
  }
});

const roomRouter = roomFactory(stream);
app.use(roomRouter);

const messageRouter = messageFactory(stream);
app.use(messageRouter);

const canvasFactory = require("./gameData/canvas/router");
const canvasRouter = canvasFactory(stream);
app.use(canvasRouter);

app.listen(port, () => `Listening on port ${port}`);
