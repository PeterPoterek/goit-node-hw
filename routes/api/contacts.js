const express = require("express");
const router = express.Router();

const { getAllContacts, getContact } = require("../../controllers/contacts/index.js");

router.get("/", async (req, res, next) => {
  getAllContacts(req, res);
});

router.get("/:contactId", async (req, res, next) => {
  getContact(req, res);
});

router.post("/", async (req, res, next) => {});

router.delete("/:contactId", async (req, res, next) => {});

router.put("/:contactId", async (req, res, next) => {});

module.exports = router;
