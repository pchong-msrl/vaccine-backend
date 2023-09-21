const express = require("express");
const router = express.Router();
const VaccineUser = require("../models/vaccineUser"); // Import your Booking model

// Endpoint to book a vaccination appointment
router.post("/register", async (req, res) => {
  try {
    // Assuming the user's booking data is sent in the request body
    const userData = req.body;

    // Here, you should validate userData, sanitize inputs, and perform any necessary checks.

    // Create a new booking record
    const newBooking = new VaccineUser(userData);
    await newBooking.save();

    // Update the corresponding time slot to mark it as booked (you need to implement this logic)

    res.status(201).json({ message: "Vaccine User register successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;