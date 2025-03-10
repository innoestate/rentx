import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DesktopProspectionsTableComponent } from './desktop-prospections-table.component';
import { EstatesUiTableAdapter } from 'src/app/estates/adapters/table/estates.table.adapter';
import { UiModule } from 'src/app/ui/ui.module';



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
    EstatesUiTableAdapter
  ]
})
export class DesktopProspectionsTableModule { }
