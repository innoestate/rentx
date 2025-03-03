import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopOwnersTableComponent } from './desktop-owners-table.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DesktopOwnersTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DesktopOwnersTableComponent }])
  ]
})
export class DesktopOwnersTableModule { }
