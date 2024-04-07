const express = require("express");
const router = express.Router();

const { getAllContacts, getContact, createContact } = require("../../controllers/contacts/index.js");

router.get("/", async (req, res, next) => {
  getAllContacts(req, res);
});

router.get("/:contactId", async (req, res, next) => {
  getContact(req.body);
});

router.post("/", async (req, res, next) => {
  createContact(req, res);
});

router.delete("/:contactId", async (req, res, next) => {});

router.put("/:contactId", async (req, res, next) => {});

module.exports = router;
