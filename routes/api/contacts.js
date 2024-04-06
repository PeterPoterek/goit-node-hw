const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "Hello from api " });
});

router.get("/:contactId", async (req, res, next) => {});

router.post("/", async (req, res, next) => {});

router.delete("/:contactId", async (req, res, next) => {});

router.put("/:contactId", async (req, res, next) => {});

module.exports = router;
