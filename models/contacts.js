const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 2,
      maxLength: 80,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minLength: 2,
      maxLength: 100,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minLength: 2,
      maxLength: 40,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("contact", contactSchema, "contacts");

module.exports = Contact;
