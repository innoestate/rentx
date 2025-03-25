import { NgModule } from '@angular/core';
import { CduComponent } from './cdu.component';
import { CommonModule } from '@angular/common';
import { CduRoutingModule } from './cdu.routing';

@NgModule({
  declarations: [
    CduComponent
  ],
  imports: [
    CommonModule,
    CduRoutingModule
  ]
})
export class CduModule { }
