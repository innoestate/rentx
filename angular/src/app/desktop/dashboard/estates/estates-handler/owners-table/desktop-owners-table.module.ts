import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopOwnersTableComponent } from './desktop-owners-table.component';
import { RouterModule } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';

@NgModule({
  declarations: [DesktopOwnersTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DesktopOwnersTableComponent }]),
    UiModule
  ]
})
export class DesktopOwnersTableModule { }
