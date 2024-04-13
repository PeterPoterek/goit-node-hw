const { createNewContact, deleteContact, fetchContact, fetchContacts, updateContact } = require("./services.js");

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

const deleteContactById = async (req, res) => {
  try {
    const deletedContact = await deleteContact(req.params.contactId);
    if (deletedContact) {
      console.log("User deleted successfully:", deletedContact);
      res.json({ message: "Contact deleted successfully" });
    } else {
      console.log("Contact not found");
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const updateContactById = async (req, res) => {
  try {
    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (updatedContact) {
      console.log("User updated successfully:", updatedContact);
      res.json(updatedContact);
    } else {
      console.log("Contact not found");
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const updateFavoriteStatus = async (req, res) => {
  try {
    const { favorite } = req.body;
    if (!favorite) {
      return res.status(400).json({ message: "Missing field favorite" });
    }
    const updatedContact = await updateStatusContact(req.params.contactId, favorite);
    if (updatedContact) {
      console.log("Favorite status updated successfully:", updatedContact);
      res.json(updatedContact);
    } else {
      console.log("Contact not found");
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = { getAllContacts, getContact, createContact, deleteContactById, updateContactById, updateFavoriteStatus };
