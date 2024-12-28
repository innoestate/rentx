import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ProspectionsDesktopComponent } from './prospections.component';
import { ProspectionsDesktopRoutingModule } from './prospections.routing';

const routes: Routes = [
  { path: '', component: ProspectionsDesktopComponent }
];

@NgModule({
  declarations: [ProspectionsDesktopComponent],
  imports: [
    CommonModule,
    ProspectionsDesktopRoutingModule
  ]
})
export class ProspectionsModule { }
