const { Router } = require("express");
const mailer = require("./src/mailer");
const path = require("path");

const router = Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

router.get("/achievement", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "achievement.html"));
});

router.get("/advertisement", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "advertisement.html"));
});

router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "contact.html"));
});

router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "home.html"));
});

router.get("/import", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "import.html"));
});

router.get("/maintenance", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "maintenance.html"));
});

router.get("/restoration", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "restoration.html"));
});

router.get("/bottomBar", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "bottomBar.html"));
});

router.post("/sendMessage", (req, res) => {
  mailer
    .sendContactRequest(...Object.values(req.body))
    .then((data) => res.status(200).send(data))
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
