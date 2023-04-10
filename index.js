require("dotenv").config();

const express = require("express");
const cors = require('cors');
const app = express();
const router = require("./router");
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  //console.log(`${req.method}: ${req.url}`);
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
