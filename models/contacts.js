const fs = require("fs/promises");
const path = require("path");

const contactsFilePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf8");
    const contacts = JSON.parse(data);

    const fetchedContact = contacts.find((contact) => contact.id.toString() === contactId);
    return fetchedContact;
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    contacts.push(body);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsFilePath, JSON.stringify(updatedContacts, null, 2));
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
