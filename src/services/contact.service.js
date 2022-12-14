const knex = require('../database/knex');
class ContactService {
    constructor() {
        this.contacts = knex('contacts');
    }
    #getContact(payload) {
        const contact = { ...payload };
        const contactProperties = [
            "name", "email", "address", "phone", "favorite"
        ];
        // Remove non-contact properties
        Object.keys(contact).forEach(function (key) {
            if (contactProperties.indexOf(key) == -1) {
                delete contact[key];
            }
        });
        return contact;
    }
    async create(payload) {
        const contact = this.#getContact(payload);
        const [id] = await this.contacts.insert(contact);
        return { id, ...contact };
    }
    // Define methods for accessing the database
}
module.exports = ContactService;