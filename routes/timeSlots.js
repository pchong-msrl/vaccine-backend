const express = require("express");
const router = express.Router();
const TimeSlot = require("../models/timeSlot"); // Import your TimeSlot model

// Endpoint to register a user for a time slot
router.post("/register/:timeSlotId/:vaccineUserId", async (req, res) => {
  try {
    const { timeSlotId, vaccineUserId } = req.params;

    // Find the time slot by its ID
    const timeSlot = await TimeSlot.findById(timeSlotId);

    if (!timeSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    // Update the time slot's registeredUserId with the user's ID
    timeSlot.registeredUserId = vaccineUserId;
    await timeSlot.save();

    res.json({ message: "User registered for time slot successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// List all available timeslots
router.get("/available", async (req, res) => {
  try {
    // Find all timeslots where registeredUserId is null
    const availableTimeSlots = await TimeSlot.find({ registeredUserId: null });

    res.json({ availableTimeSlots });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch available timeslots" });
  }
});

module.exports = router;
