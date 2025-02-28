import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstatesDataModule } from 'src/app/estates/data/estates.data.module';
import { UxTableComponent } from 'src/app/ux/components/ux-table/ux-table.component';
import { EstatesListComponent } from './estates-list.component';
import { UxModule } from 'src/app/ux/ux.module';
import { UxPopupService } from 'src/app/ux/popup/services/popup.service';
import { EstatesBusinessModuleModule } from 'src/app/estates/business/estates.business.module.module';



@NgModule({
  declarations: [EstatesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EstatesListComponent }]),
    UxTableComponent,
    EstatesBusinessModuleModule,
    UxModule
  ],
  providers: [
    UxPopupService,
  ]
})
export class EstatesListModule {


}
