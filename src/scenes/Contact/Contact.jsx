import React, { useEffect, useState } from 'react';

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:4000/createContact/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  return (
    <div className="Contact">
      <h1>Contact List</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            <h2>{contact.name}</h2>
            <p>Email: {contact.email}</p>
            <p>Message: {contact.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contact;

