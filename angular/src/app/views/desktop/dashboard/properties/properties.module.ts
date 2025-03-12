import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EstatesCommandsService } from 'src/app/estates/commands/estates.commands.service';
import { EstatesDataModule } from 'src/app/estates/data/estates.data.module';
import { LodgersCommandsService } from 'src/app/lodgers/commands/lodgers.commands.service';
import { LodgersDataModule } from 'src/app/lodgers/data/lodgers.data.module';
import { OwnersCommandsService } from 'src/app/owners/commands/owners.command.service';
import { OwnersDataModule } from 'src/app/owners/data/owners.data.module';
import { EstatesHandlerMenuModule } from './menu/estates-handler-menu.module';
import { DesktopEstatesHandlerComponent } from './properties.component';
import { DesktopEstatesHandlerRoutingModule } from './properties.routing';
import { RentsDataModule } from 'src/app/rents/data/module/rents.data.module';
import { RentsCommandsService } from 'src/app/rents/commands/rents.commands.service';



@NgModule({
  declarations: [DesktopEstatesHandlerComponent],
  imports: [
    CommonModule,

    EstatesDataModule,
    OwnersDataModule,
    LodgersDataModule,
    RentsDataModule,

    DesktopEstatesHandlerRoutingModule,
    EstatesHandlerMenuModule,
  ],
  providers: [
    EstatesCommandsService,
    OwnersCommandsService,
    LodgersCommandsService,
    RentsCommandsService
  ]
})
export class DesktopPropertiesModule {

  constructor(){
    console.log('DesktopPropertiesModule constructor');
  }

 }
