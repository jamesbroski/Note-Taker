const express = require("express");
const path = require("path");
const fs = require("fs");

// const uuid = require("./helpers/uuid");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for tips`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  //grab data from the front end via req.body

  const { username, topic, note } = req.body;

  if (req.body) {
    const newNote = {
      username,
      note,
      topic,
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});
