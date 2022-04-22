const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Lists = require("./modals/lists");
const Notes = require("./modals/notes");

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

const user = {
  name: "siva",
  password: "siva@262",
};

app.post("/", (req, res) => {
  const Name = req.body.name;
  const Password = req.body.password;
  if (Name === user.name && Password === user.password) {
    res.status(200).json(user);
  } else {
    res.status(500).json("Invalid user");
  }
});

app.post("/lists", async (req, res) => {
  const newLists = new Lists(req.body);
  try {
    const saveLists = await newLists.save();
    res.status(200).json(saveLists);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/lists", async (req, res) => {
  try {
    const lists = await Lists.find();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/lists/:id", async (req, res) => {
  try {
    const lists = await Lists.findByIdAndDelete(req.params.id);
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/lists/:id", async (req, res) => {
  try {
    const updatedList = await Lists.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/notes", async (req, res) => {
  const newNotes = new Notes(req.body);
  const listId = req.body.listId;
  try {
    await Lists.findByIdAndUpdate(listId, {
      $set: { updated: new Date(Date.now()) },
    });
    const saveNotes = await newNotes.save();
    res.status(200).json(saveNotes);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/notes", async (req, res) => {
  const listId = req.query.listId;
  try {
    const notes = await Notes.find({ listId: listId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(PORT, () => console.log(`server is running in ${PORT}`));
