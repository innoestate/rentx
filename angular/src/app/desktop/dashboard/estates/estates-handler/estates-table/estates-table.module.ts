import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiTableComponent } from 'src/app/ui/components/ui-table/ui-table.component';
import { UiPopupService } from 'src/app/ui/popup/services/popup.service';
import { UiModule } from 'src/app/ui/ui.module';
import { EstatesTableComponent } from './estates-table.component';



@NgModule({
  declarations: [EstatesTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EstatesTableComponent }]),
    UiTableComponent,
    UiModule
  ],
  providers: [
    UiPopupService,
  ]
})
export class EstatesTableModule {


}
