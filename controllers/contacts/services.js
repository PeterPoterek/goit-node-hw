const Contact = require("../../models/contacts.js");

const fetchContacts = () => {
  return Contact.find();
};

const fetchContact = (id) => {
  return Contact.findOne({ _id: id });
};

const createNewContact = async (contactData) => {
  const newContact = await Contact.create(contactData);
  console.log("User created successfully:", newContact);
  return newContact;
};

const deleteContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};

const updateContact = async (id, updatedData) => {
  return Contact.findByIdAndUpdate(id, updatedData, { new: true });
};

const updateStatusContact = async (id, favorite) => {
  return Contact.findByIdAndUpdate(id, { favorite }, { new: true });
};

module.exports = { fetchContacts, fetchContact, createNewContact, deleteContact, updateContact, updateStatusContact };
