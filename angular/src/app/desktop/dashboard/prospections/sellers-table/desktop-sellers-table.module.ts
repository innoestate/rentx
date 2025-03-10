import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopSellersTableComponent } from './desktop-sellers-table.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DesktopSellersTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DesktopSellersTableComponent}])
  ]
})
export class DesktopSellersTableModule { }
