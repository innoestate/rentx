import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CduComponent } from './cdu.component';

const routes: Routes = [
  { path: '', component: CduComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CduRoutingModule { }
