const mongoose = require("mongoose");

const vaccineUserSchema = new mongoose.Schema({
  englishName: {
    type: String,
    required: true,
    validate: {
      validator: (name) => /^[a-zA-Z ]+$/.test(name),
      message: "English name must contain only letters and spaces",
    },
  },
  chineseName: {
    type: String,
    required: true,
    validate: {
      validator: (name) => /^[\u4e00-\u9fff]+$/.test(name),
      message: "Chinese name must contain only Chinese characters",
    },
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "male", "female"],
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: String,
  placeOfBirth: String,
  vaccineBrand: {
    type: String,
    enum: [
      "pfizer",
      "moderna",
      "astraZeneca",
      "johnson & johnson",
      "Pfizer",
      "Moderna",
      "AstraZeneca",
      "Johnson & johnson",
    ],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (phone) => /^\d{8}$/.test(phone),
      message: "Phone number must be 8 digits",
    },
  },
  hashedPhoneNumber: {
    type: String,
    required: true,
  },
  hashedID: {
    type: String,
    required: true,
  },
  idFirst5Characters: {
    type: String,
    required: true,
  },
  randomSalt: {
    type: String,
    required: true,
  },
  // You can include additional fields such as appointment time, status, etc.
});

const VaccineUser = mongoose.model("VaccineUser", vaccineUserSchema);

module.exports = VaccineUser;
