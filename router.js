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
  let messages = [];
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (
    req.body.firstName === "" ||
    req.body.lastName === "" ||
    req.body.email === "" ||
    req.body.phone === "" ||
    req.body.message === ""
  ) {
    messages.push("All fileds must be filled");
  }
  if (!emailRegex.test(req.body.email)) {
    messages.push("Invalid email");
  }
  if (/[^0-9]/.test(req.body.phone) || req.body.phone.length !== 9) {
    messages.push("Invalid phone number");
  }

  if (messages.length !== 0) {
    res.status(406).send(messages);
  } else {
    mailer
      .sendContactRequest(...Object.values(req.body))
      .then((data) => res.status(200).send(data))
      .catch((error) => res.status(500).send(error));
  }
});

module.exports = router;