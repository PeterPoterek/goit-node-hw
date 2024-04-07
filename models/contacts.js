const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minLength: 2,
      maxLength: 100,
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
      maxLength: 100,
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
