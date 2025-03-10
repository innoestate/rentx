import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DesktopProspectionsTableComponent } from './desktop-prospections-table.component';



@NgModule({
  declarations: [
    DesktopProspectionsTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DesktopProspectionsTableComponent }])
  ]
})
export class DesktopProspectionsTableModule { }
