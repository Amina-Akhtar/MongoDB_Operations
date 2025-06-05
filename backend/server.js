const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/user"); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ;
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/insertOne", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/insertMany",async(req,res)=>{
  try{
   const result=await User.insertMany(req.body);
   res.json(result)
  }catch(err){
    res.status(400).json({error: err.message})
  }
});

app.post("/find", async (req, res) => {
  try {
    const result = await User.find(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/findOne", async (req, res) => {
  try {
    const result = await User.findOne(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/find_limit", async (req, res) => {
  try {
    const { query, limit } = req.body;
    const result = await User.find(query).limit(limit);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/find_skip", async (req, res) => {
  try {
    const { query, skip } = req.body;
    const result = await User.find(query).skip(skip);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/find_sort", async (req, res) => {
  try {
    const { query, sort } = req.body;
    const result = await User.find(query).sort(sort);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/distinct", async (req, res) => {
  try {
    const { field } = req.body;
    const result = await User.distinct(field);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/countDocuments", async (req, res) => {
  try {
    const result = await User.countDocuments(req.body);
    res.json({ count: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/updateOne", async (req, res) => {
  try {
    const { filter, update } = req.body;
    const result = await User.updateOne(filter, update);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/updateMany", async (req, res) => {
  try {
    const { filter, update } = req.body;
    const result = await User.updateMany(filter, update);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/replaceOne", async (req, res) => {
  try {
    const { filter, replacement } = req.body;
    const result = await User.replaceOne(filter, replacement);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/deleteOne", async (req, res) => {
  try {
    const result = await User.deleteOne(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/deleteMany", async (req, res) => {
  try {
    const result = await User.deleteMany(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/aggregate", async (req, res) => {
  try {
    const pipeline = req.body;
    const result = await User.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/createIndex", async (req, res) => {
  try {
    const result = await User.collection.createIndex(req.body.fields, req.body.options);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/dropIndex", async (req, res) => {
  try {
    const result = await User.collection.dropIndex(req.body.name);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/getIndexes",async (req, res) => {
  try {
    const result = await User.collection.indexes();
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/findOneAndUpdate", async (req, res) => {
  try {
    const { filter, update, options } = req.body;
    const result = await User.findOneAndUpdate(filter, update, { ...options, new: true });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/findOneAndDelete", async (req, res) => {
  try {
    const result = await User.findOneAndDelete(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/bulkWrite", async (req, res) => {
  try {
    const result = await User.bulkWrite(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/findOneAndReplace", async (req, res) => {
  try {
    const { filter, replacement } = req.body;
    const result = await User.findOneAndReplace(filter, replacement, { new: true });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/renameCollection", async (req, res) => {
  try {
    const result = await User.collection.rename(req.body.newName);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/drop", async (req, res) => {
  try {
    const result = await User.collection.drop();
    res.json({ success: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/listCollections", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
