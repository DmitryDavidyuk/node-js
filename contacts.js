const { error } = require("console");
const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) console.error(error);
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) console.error(error);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => {
      if (contact.id === contactId) {
        console.table(contact);
      } else if (contact.id == null) {
        console.log(`Contacts with ${contactId} not found`);
      }
    });
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) console.error(error);

    const contacts = JSON.parse(data);
    const newContact = contacts.filter((contact) => contact.id !== contactId);

    if (contacts.length === newContact.length) {
      console.error(
        `Contact with ID "${contactId}" don't removed! ID "${contactId}" not found!`
      );
    }

    console.log("Contact deleted successfully! New list of contacts: ");
    console.table(newContact);

    fs.writeFile(contactsPath, JSON.stringify(newContact), (error) => {
      if (error) console.error(error);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) console.error(error);

    const contacts = JSON.parse(data);
    const id = Number(contacts.at(-1).id) + 1;

    contacts.push({
      id: id.toString(),
      name,
      email,
      phone,
    });

    console.log("Contacts added successfully! New lists of contacts: ");
    console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
      if (error) console.error(error);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
