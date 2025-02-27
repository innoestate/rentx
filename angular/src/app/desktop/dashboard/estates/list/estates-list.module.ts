import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstatesDataModule } from 'src/app/common/estates/data/estates.data.module';
import { UxTableComponent } from 'src/app/ux/components/ux-table/ux-table.component';
import { EstatesListComponent } from './estates-list.component';



@NgModule({
  declarations: [EstatesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EstatesListComponent }]),
    UxTableComponent,
    EstatesDataModule
  ]
})
export class EstatesListModule {


}
