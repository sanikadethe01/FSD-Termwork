require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Project = require("./models/Project");
const Contact = require("./models/Contact");

const app = express();

// ENV variables
const FRONTEND_URL = process.env.FRONTEND_URL || "*";
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
  origin: FRONTEND_URL === "*" ? "*" : FRONTEND_URL,
  methods: ["GET", "POST"],
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI)
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});