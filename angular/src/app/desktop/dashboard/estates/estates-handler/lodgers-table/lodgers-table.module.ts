import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopLodgersTableComponent } from './lodgers-table.component';
import { RouterModule } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';
import { UiPopupService } from 'src/app/ui/popup/services/popup.service';
import { LodgersModule } from 'src/app/lodgers/lodgers.module';



@NgModule({
  declarations: [
    DesktopLodgersTableComponent
  ],
  imports: [
    CommonModule,
    LodgersModule,
    RouterModule.forChild([{path: '', component: DesktopLodgersTableComponent}]),
    UiModule,
  ],
  providers: [
    UiPopupService,
  ]
})
export class DesktopLodgersTableModule { }
