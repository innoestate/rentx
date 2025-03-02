import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopEstatesComponent } from './estates.component';
import { EstatesDesktopRoutingModule } from './estates.routing';
import { EstatesModule } from 'src/app/estates/estates.module';



@NgModule({
  declarations: [DesktopEstatesComponent],
  imports: [
    CommonModule,
    EstatesModule,
    EstatesDesktopRoutingModule,
  ]
})
export class DesktopEstatesModule { }
