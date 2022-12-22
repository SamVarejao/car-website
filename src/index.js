const express = require("express");
const app = express();
const router = require("./router");
const PORT = 3001;
const path = require("path");

app.use(express.json());

app.use(express.static(path.join(process.cwd(), "public")));

app.use((req, res, next) => {
  console.log(`Running on port ${req.method}: ${req.url}`);
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
