import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProspectionsDesktopComponent } from './prospections.component';

const routes: Routes = [
  { path: '', component: ProspectionsDesktopComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProspectionsDesktopRoutingModule { }
