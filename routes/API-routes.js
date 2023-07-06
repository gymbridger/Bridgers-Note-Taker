const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();

router.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

router.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    let newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    notes.push(newNote);
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes, null, 2),
      (err) => {
        if (err) throw err;
        res.status(200).json(newNote);
      }
    );
  });
});

router.delete("/api/notes/:id", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== req.params.id);
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes, null, 2),
      (err) => {
        if (err) throw err;
        res.status(200).end();
      }
    );
  });
});

module.exports = router;
