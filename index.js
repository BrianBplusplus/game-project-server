const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

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

app.listen(port, () => `Listening on port ${port}`);
