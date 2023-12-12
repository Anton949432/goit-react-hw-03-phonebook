import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      filter: '',
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (contact) => {
    this.setState((prevState) => ({ contacts: [...prevState.contacts, contact] }));
  };

  onDeleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  handleFilterChange = (value) => {
    this.setState({ filter: value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Телефонна книга</h1>
        <ContactForm contacts={contacts} addContact={this.addContact} />

        <h2>Контакти</h2>
        <Filter filter={filter} setFilter={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.onDeleteContact} />
      </div>
    );
  }
}

export default App;
