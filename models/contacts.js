const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      maxLength: 100,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      maxLength: 40,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Contact = mongoose.model("contact", contactSchema, "contacts");

module.exports = Contact;
