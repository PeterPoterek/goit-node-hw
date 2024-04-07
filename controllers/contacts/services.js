const Contact = require("../../models/contacts.js");

const fetchContacts = () => {
  return Contact.find();
};

const fetchContact = (id) => {
  return Contact.findOne({ _id: id });
};

module.exports = { fetchContacts, fetchContact };
