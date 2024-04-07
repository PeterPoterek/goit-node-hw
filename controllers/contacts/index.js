const { fetchContacts, fetchContact, createNewContact } = require("./services.js");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await fetchContacts();
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await fetchContact(req.params.contactId);
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const createContact = async (req, res) => {
  try {
    const newContact = await createNewContact(req.body);
    console.log("User created successfully:", newContact);
    res.status(201).json(newContact);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = { getAllContacts, getContact, createContact };
