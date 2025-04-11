import { RouterModule, Routes } from '@angular/router';
import { InvestScopeComponent } from './invest-scope.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', component: InvestScopeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestScopeDesktopRoutingModule { }
