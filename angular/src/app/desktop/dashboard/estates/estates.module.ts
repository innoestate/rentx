import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopEstatesComponent } from './estates.component';
import { EstatesDesktopRoutingModule } from './estates.routing';
import { EstatesModule } from 'src/app/estates/estates.module';
import { DesktopEstatesHandlerComponent } from './estates-handler/estates-handler.component';
import { DesktopEstatesHandlerMenuComponent } from './estates-handler/estates-handler-menu/estates-handler-menu.component';
import { UiModule } from 'src/app/ui/ui.module';



@NgModule({
  declarations: [DesktopEstatesComponent, DesktopEstatesHandlerComponent, DesktopEstatesHandlerMenuComponent],
  imports: [
    CommonModule,
    EstatesModule,
    EstatesDesktopRoutingModule,
    UiModule
  ]
})
export class DesktopEstatesModule { }
