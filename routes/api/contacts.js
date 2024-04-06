const express = require("express");
const router = express.Router();

const Contact = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find({});

    console.log(Contact);

    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `${err}` });
  }
});

router.get("/:contactId", async (req, res, next) => {});

router.post("/", async (req, res, next) => {});

router.delete("/:contactId", async (req, res, next) => {});

router.put("/:contactId", async (req, res, next) => {});

module.exports = router;
