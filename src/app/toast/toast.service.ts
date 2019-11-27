import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { timeout } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastChanged: Subject<any> = new Subject<any>();
  constructor() { }

  // tslint:disable-next-line: no-shadowed-variable
  showToast(type: string, message: string, timeout: number) {
    this.toastChanged.next({
      // tslint:disable-next-line: object-literal-shorthand
      type: type,
      // tslint:disable-next-line: object-literal-shorthand
      message: message,
      // tslint:disable-next-line: object-literal-shorthand
      timeout: timeout
    });
  }
}
