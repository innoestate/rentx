import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopEstatesComponent } from './estates.component';
import { EstatesDesktopRoutingModule } from './estates.routing';



@NgModule({
  declarations: [DesktopEstatesComponent],
  imports: [
    CommonModule,
    EstatesDesktopRoutingModule
  ]
})
export class EstatesModule { }
