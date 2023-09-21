const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ExpressBrute = require("express-brute");
const MongooseStore = require("express-brute-mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000; // Use port 3000 by default, but you can change it

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.at2utsm.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Enable CORS
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Use middleware to parse JSON requests
app.use(express.json());

// Import and use your route files
const timeSlotRoutes = require("./routes/timeSlots");
const vaccineUserRoutes = require("./routes/vaccineUsers");

app.use("/timeslots", timeSlotRoutes);
app.use("/vaccineusers", vaccineUserRoutes);

// Define a mongoose model for storing brute force prevention data
const BruteForceModel = mongoose.model("bruteforce", new mongoose.Schema({}));

const store = new MongooseStore(BruteForceModel);

const bruteforce = new ExpressBrute(store, {
  freeRetries: 2, // Number of allowed retries before lockout
  lifetime: 60 * 60, // Lockout time (1 hour in seconds) after exceeding retries
});

// Apply the brute force middleware to specific routes or all routes as needed
app.post("/vaccineusers/register", bruteforce.prevent); // Apply brute force protection to the create vaccine user endpoint
