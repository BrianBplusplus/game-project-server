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

require("./title/model");
require("./category/model");

app.listen(port, () => `Listening on port ${port}`);
