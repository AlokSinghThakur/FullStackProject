const express = require("express");
const db = require("./db.json");
const fs = require("fs"); //file system
const bodyParser = require("body-parser");
const async = require("async");

require("dotenv").config();

const MongoDB = require("./mongo");
const { mongo } = require("mongoose");
const notemodel = require("./notemodel");

const port = process.env.BACKEND_PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

MongoDB.start(); //db has been started

app.get("/notes", (req, res) => {
  let notes = res.json({
    results: db.notes,
  });
});

app.get("/newnotes", (req, res) => {
  async.auto(
    {
      notes: function (cb) {
        notemodel.find().exec(function (err, notes) {
          if (err) {
            return cb("Unable to fetch notes.");
          }
          console.log(notes);
          return cb(null, notes);
        });
      },
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      return res.json({ results: results.notes });
    }
  );
});

app.post("/addnewnote", (req, res) => {
  let Existingnotes = db.notes;
  let note = req.body.note;

  Existingnotes.push(note);
  fs.writeFile("db.json", JSON.stringify({ notes: Existingnotes }), () => {});

  res.send("Note Created");
});


//Post Request MongoDB 
app.post("/newnotes", async (req, res) => {
  const data = new notemodel({
    description: req.body.description,
    title: req.body.title,
  });

  const val = await data.save();

  res.send("Note Sucessfully Created");
});

app.listen(port, () => {
  console.log("App has been started");
});

/*
app.delete('/delete',()=>{
    
})

*/
