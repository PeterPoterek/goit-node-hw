const express = require("express");
const router = express.Router();

const {
  createContact,
  deleteContactById,
  getAllContacts,
  getContact,
  updateContactById,
  updateFavoriteStatus,
} = require("../../controllers/contacts/index.js");

router.get("/", async (req, res, next) => {
  getAllContacts(req, res);
});

router.get("/:contactId", async (req, res, next) => {
  getContact(req, res);
});

router.post("/", async (req, res, next) => {
  createContact(req, res);
});

router.delete("/:contactId", async (req, res, next) => {
  deleteContactById(req, res);
});

router.put("/:contactId", async (req, res, next) => {
  updateContactById(req, res);
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  updateFavoriteStatus(req, res);
});

module.exports = router;
