const bodyParser = require('body-parser');
const express = require('express')
const db = require('./db.json')
const fs = require('fs');
const noteModel = require('./note')
const MongoDB   = require('./mongodb');
const  async = require('async')
// Test Commit
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

MongoDB.start()

app.get('/mynotes', (req, res) => {
    res.json(
    {
        "results": db.notes
    })
  })

  
  app.get('/newnote', (req, res) => {
    async.auto({
      notes: function (cb) {
        noteModel.find().exec(function (err, notes) {
          if (err) {
            return cb("Unable to fetch notes.");
          }
          console.log(notes)
          return cb(null, notes);
        });
      }
    }, function (err, results) {
      if (err) {
        return res.status(403).json({error: err});
      }
      return res.json({results: results.notes});
    });
  });

  //post api for mongodb ->inserting data
  app.post("/newnotePost", async (req, res) => {
    const data = new noteModel({
      description: req.body.description,
      title: req.body.title,
    });
  
    const val = await data.save();
  
    res.send("Note Sucessfully Created");
  });

  //post api for local database
  app.post('/new', (req, res) => {
  var note = req.body && req.body.note || {};
  console.log("note: ", note)
  console.log("check: ", (!note))
  var description = note.description || false;
  var title = note.title || false;
  var error = {};
  
  if (!(!!note)) {
    console.log("val", note)
    error.note = "Note is not provided";
    res.status(403).json(error);
  }
  
  if (!description) {
    error.description = "Please add descp";
  }
  
  if (!title) {
    error.title = "Please add title";
  }
  
  if (error) {
    res.status(403).json(error);
  }
  var notes = db.notes
  var note = req.body.note

  notes.push(note)
  fs.writeFile("db.json", JSON.stringify({ notes: notes }), () => {})

  res.send({
    "result": "created successfully",
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})















