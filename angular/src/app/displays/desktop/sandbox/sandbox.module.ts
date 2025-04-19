import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SandboxComponent } from './sandbox.component';
import { UiModule } from 'src/app/ui/ui.module';



@NgModule({
  declarations: [SandboxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: SandboxComponent}]),
    UiModule.forChild()
  ]
})
export class SandboxModule { }
