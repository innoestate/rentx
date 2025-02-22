import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersTableComponent } from './owners-table.component';
import { RouterModule } from '@angular/router';
import { UxTableComponent } from 'src/app/ux/components/ux-table/ux-table/ux-table.component';


@NgModule({
  declarations: [
    OwnersTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: OwnersTableComponent }
    ]),
    UxTableComponent
  ]
})
export class OwnersTableModule { }
