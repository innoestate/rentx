import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UxTableComponent } from 'src/app/ux/components/ux-table/ux-table.component';
import { UxPopupService } from 'src/app/ux/popup/services/popup.service';
import { UxModule } from 'src/app/ux/ux.module';
import { EstatesListComponent } from './estates-list.component';



@NgModule({
  declarations: [EstatesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EstatesListComponent }]),
    UxTableComponent,
    UxModule
  ],
  providers: [
    UxPopupService,
  ]
})
export class EstatesListModule {


}
