const express = require("express");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const router = express.Router();

router.get("/notes", (req, res) => {
  console.info(`${req.method} request received for tips`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

router.post("/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  //grab data from the front end via req.body
  console.log(req.body);
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = router;
