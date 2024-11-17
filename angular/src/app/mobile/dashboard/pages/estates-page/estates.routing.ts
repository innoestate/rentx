import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstatesMobilePageComponent } from './estates-page.component';

const routes: Routes = [
  { path: '', component: EstatesMobilePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstatesDesktopRoutingModule { }
