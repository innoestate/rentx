import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProspectionsTableAdapter } from 'src/app/prospections/adapters/prospections.table.adapter';
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
    ProspectionsTableAdapter
  ]
})
export class DesktopProspectionsTableModule { }
