const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Project = require("./models/Project");
const Contact = require("./models/Contact");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes

// Add Project
app.post("/addProject", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send("Project Added");
  } catch (error) {
    res.status(500).send("Error adding project");
  }
});

// Get Projects
app.get("/projects", async (req, res) => {
  try {
    const data = await Project.find();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching projects");
  }
});

// Add Contact Message
app.post("/sendMessage", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send("Message Sent Successfully");
  } catch (error) {
    res.status(500).send("Error sending message");
  }
});

// Get Contact Messages
app.get("/messages", async (req, res) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching messages");
  }
});

// Start Server (IMPORTANT FIX)
app.listen(5000, () => {
    console.log("Server running on port 5000");
});