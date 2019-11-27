import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../localStorageService';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IUser {
  id?: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: IUser = {username: '', password: ''};
  localStorageService: LocalStorageService<IUser>;
  currentUser: IUser = null;
  constructor(private router: Router, private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('user');
  }

  ngOnInit() {
    this.currentUser = this.localStorageService.getItemsFromLocalStorage(null);
    console.log('this currentUser...........', this.currentUser);
    if (this.currentUser != null) {
      // this.router.navigate(['contacts']);
    }
  }

  login(user: IUser) {
    console.log('from login user: ', user);
    const defaultUser: IUser = {username: 'Jimmy', password: 'jc123'};
    if (user.username != null && user.password != null) {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
        // log the user in
        // store user in local storage
        this.localStorageService.saveItemsToLocalStorage(user);
        // navigat to contacts page
        this.router.navigate(['contacts', user]);
      } else {
        this.toastService.showToast('danger', 'Login Failed! Check username and password...', 15000);
      }
    } else {
      // show error toast
      this.toastService.showToast('danger', 'Login Failed! Specify username and password...', 15000);
    }

  }

}
