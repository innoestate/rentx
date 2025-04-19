import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopPropertiesComponent } from './properties.component';

const routes: Routes = [
  {
    path: '', component: DesktopPropertiesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesDesktopRoutingModule { }
