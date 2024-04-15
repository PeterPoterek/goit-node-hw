const Contact = require("../../models/contacts/contacts.js");

const fetchContacts = (userId) => {
  return Contact.find({ owner: userId });
};

const fetchContact = (userId, id) => {
  return Contact.findOne({ _id: id, owner: userId });
};

const createNewContact = async (userId, contactData) => {
  const newContact = await Contact.create({ ...contactData, owner: userId });
  console.log("Contact created successfully:", newContact);
  return newContact;
};

const deleteContact = async (userId, id) => {
  return Contact.findOneAndDelete({ _id: id, owner: userId });
};

const updateContact = async (userId, id, updatedData) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, updatedData, { new: true });
};

const updateStatusContact = async (userId, id, favorite) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, { favorite }, { new: true });
};

module.exports = { fetchContacts, fetchContact, createNewContact, deleteContact, updateContact, updateStatusContact };
