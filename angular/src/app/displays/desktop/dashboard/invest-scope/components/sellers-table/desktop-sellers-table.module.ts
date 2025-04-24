import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopSellersTableComponent } from './desktop-sellers-table.component';
import { RouterModule } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';
import { SellersTableAdapterService } from 'src/app/features/sellers/adapters/sellers.table.adapter';
import { SellersTable2AdapterService } from 'src/app/features/sellers/adapters/sellers.table.adapter';



@NgModule({
  declarations: [
    DesktopSellersTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DesktopSellersTableComponent}]),
    UiModule.forChild()
  ],
  providers: [
    SellersTable2AdapterService
  ]
})
export class DesktopSellersTableModule { }
