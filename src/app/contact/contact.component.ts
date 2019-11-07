import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.modal';
import { HttpClient } from '@angular/common/http';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<Contact> = [];
  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.loadContacts();
  }
  async loadContacts() {
    const savedContacts = this.getItemsFromLocalStorage('contacts');
    if (savedContacts && savedContacts.length > 0) {
      this.contacts = savedContacts;
    } else {
      // not sure why this error is happening
      this.contacts = await this.loadItemsFromFile();
    }
    this.sortByID(this.contacts);
  }

  async loadItemsFromFile() {
    const data = await this.http.get('assets/contacts.json').toPromise();
    return data;
  }
  addContact() {
    this.contacts.unshift(new Contact({}));
  }
  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.saveItemsToLocalStorage(this.contacts);
  }
  saveContact(contact: Contact) {
    contact.editing = false;
    this.saveItemsToLocalStorage(this.contacts);
  }
  saveItemsToLocalStorage(contacts: Array<Contact>) {
    contacts = this.sortByID(contacts);
    const savedContacts = localStorage.setItem('contacts', JSON.stringify(contacts));
    return savedContacts;
  }
  getItemsFromLocalStorage(key: string) {
    const savedContacts = JSON.parse(localStorage.getItem(key));
    return savedContacts;
  }
  searchContact(params: string) {
    this.contacts = this.contacts.filter((item: Contact) => {
      const fullName = item.firstName + ' ' + item.lastName;
      if (params === item.firstName || params === item.lastName || params === fullName) {
        return true;
      } else {
        return false;
      }
    });

  }
  sortByID(contacts: Array<Contact>) {
    contacts.sort((prevContact: Contact, presContact: Contact) => {
      return prevContact.id > presContact.id ? 1 : -1;
    });
    return contacts;
  }
}
