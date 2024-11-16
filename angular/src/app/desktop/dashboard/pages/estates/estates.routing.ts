import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstatesPageDesktopComponent } from './estates.component';

const routes: Routes = [
  { path: '', component: EstatesPageDesktopComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstatesDesktopRoutingModule { }
