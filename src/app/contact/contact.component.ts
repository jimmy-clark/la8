import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.modal';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localStorageService';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../login/login.component';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<Contact> = [];
  contactParams = '';
  localStorageService: LocalStorageService<Contact>;
  currentUser: IUser;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('contacts');
  }

  async ngOnInit() {
    const currentUser = this.localStorageService.getItemsFromLocalStorage('user');
    if (currentUser != null) {
      this.router.navigate(['login']);
    }

    this.loadContacts();
    this.activatedRoute.params.subscribe((data: IUser) => {
      console.log('data passed from the login component to this component', data);
      this.currentUser = data;
    });
  }
  async loadContacts() {
    const savedContacts = this.getItemsFromLocalStorage('contacts');
    if (savedContacts && savedContacts.length > 0) {
      this.contacts = savedContacts;
    } else {

      // not sure why this error is happening
      const contact: any = await this.loadItemsFromFile();
      this.contacts = contact;
    }
    this.sortByID(this.contacts);
  }
  async loadItemsFromFile() {
    const data0 = this.http.get('assets/contacts.json').toPromise();
    const data = await this.http.get('assets/contacts.json').toPromise();
    return data;
  }
  addContact() {
    this.contacts.unshift(new Contact({
      id: null,
      firstName: null,
      lastName: null,
      phone: null,
      email: null
    }));
  }
  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.saveItemsToLocalStorage(this.contacts);
  }
  saveContact(contact: Contact) {
    let hasError = false;
    Object.keys(contact).forEach((key: any) => {
      if (contact[key] == null) {
        hasError = true;
        this.toastService.showToast('danger', `Saved Failed!  ${key} must not be null`, 2000);
      }
    });
    if (!hasError) {
      contact.editing = false;
      this.saveItemsToLocalStorage(this.contacts);
    }
  }
  saveItemsToLocalStorage(contacts: Array<Contact>) {
    contacts = this.sortByID(contacts);
    return this.localStorageService.saveItemsToLocalStorage(contacts);
  }
  getItemsFromLocalStorage(key: string) {
    // const savedContacts = JSON.parse(localStorage.getItem(key));
    return this.localStorageService.getItemsFromLocalStorage('contacts');
    // return savedContacts;
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
  logout() {
    // clear localStorgage
    this.localStorageService.clearItemFromLocalStorage('user');
    // navigate home
    this.router.navigate(['']);

  }
}
