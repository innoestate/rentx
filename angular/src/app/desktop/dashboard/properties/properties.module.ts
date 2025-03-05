import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LodgersCommandsModule } from 'src/app/lodgers/commands/lodgers.commands.module';
import { OwnersCommandsModule } from 'src/app/owners/commands/owners.commands.module';
import { EstatesHandlerMenuModule } from './menu/estates-handler-menu.module';
import { DesktopEstatesHandlerComponent } from './properties.component';
import { DesktopEstatesHandlerRoutingModule } from './properties.routing';
import { EstatesCommandsModule } from 'src/app/estates/commands/estates.commands.module';



@NgModule({
  declarations: [DesktopEstatesHandlerComponent],
  imports: [
    CommonModule,

    // LodgersDataModule.forRoot(),
    // OwnersDataModule.forRoot(),
    // EstatesDataModule.forRoot(),

    LodgersCommandsModule.forRoot(),
    OwnersCommandsModule.forRoot(),
    EstatesCommandsModule.forRoot(),

    // UiModule.forChild(),

    DesktopEstatesHandlerRoutingModule,

    EstatesHandlerMenuModule,
  ]
})
export class DesktopPropertiesModule {

  constructor(){
    console.log('DesktopPropertiesModule constructor');
  }

 }
