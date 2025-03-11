import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstatesUiTableAdapter } from 'src/app/estates/adapters/table/estates.table.adapter';
import { UiModule } from 'src/app/ui/ui.module';
import { EstatesTableComponent } from './estates-table.component';



@NgModule({
  declarations: [EstatesTableComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: EstatesTableComponent }]),
    CommonModule,

    UiModule.forChild(),

  ],
  providers: [
    EstatesUiTableAdapter
  ]
})
export class EstatesTableModule {

  constructor() {
    console.log('estate table module constructor');
  }

}
