const { response } = require("express");
const express = require("express");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
const router = express.Router();
const fs = require("fs");

router.get("/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
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
      note_id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

router.delete("/notes/:id", (req, res) => {
  let noteId = req.params.id.toString();
  let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const newData = data.filter((note) => note.id.toString() !== noteId);
  fs.writeFileSync("./db/db.json", JSON.stringify(newData));
  res.json(newData);
});

module.exports = router;
