const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
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
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Contact = mongoose.model("contact", contactSchema, "contacts");

module.exports = Contact;
