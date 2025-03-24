import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProspectionsTableAdapterService } from 'src/app/features/prospections/adapters/table/prospections.table.adapter.service';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopProspectionsTableComponent } from './desktop-prospections-table.component';



@NgModule({
  declarations: [
    DesktopProspectionsTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DesktopProspectionsTableComponent }]),
    UiModule.forChild(),
  ],
  providers: [
    ProspectionsTableAdapterService
  ]
})
export class DesktopProspectionsTableModule { }
