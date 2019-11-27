import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { AlertModule } from 'ngx-bootstrap/alert';




@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  exports: [
    ToastComponent
  ]
})
export class ToastModule { }
