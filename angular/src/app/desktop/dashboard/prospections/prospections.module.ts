import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopProspectionsComponent } from './prospections.component';
import { ProspectionsDesktopRoutingModule } from './prospections.routing';
import { DesktopProspectionsHandlerMenuComponent } from './menu/desktop-prospections-handler-menu.component';
import { UiModule } from 'src/app/ui/ui.module';



@NgModule({
  declarations: [
    DesktopProspectionsComponent,
    DesktopProspectionsHandlerMenuComponent,
  ],
  imports: [
    CommonModule,
    ProspectionsDesktopRoutingModule,
    UiModule
  ]
})
export class ProspectionsModule { }
