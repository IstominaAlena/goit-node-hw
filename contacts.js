const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateFile = async (items) => {
  await fs.writeFile(contactsPath, JSON.stringify(items, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    return null;
  }

  return contact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);

  if (idx === -1) {
    return null;
  }

  const deleteContact = contacts[idx];

  contacts.splice(idx, 1);
  updateFile(contacts);

  return deleteContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const id = (
    Math.max(...contacts.map((contact) => contact.id)) + 1
  ).toString();
  const contact = { id, name, email, phone };

  contacts.push(contact);
  updateFile(contacts);

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
