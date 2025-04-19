import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EstatesCommandsService } from 'src/app/features/estates/commands/estates.commands.service';
import { EstatesDataModule } from 'src/app/features/estates/data/module/estates.data.module';
import { LodgersCommandsService } from 'src/app/features/lodgers/commands/lodgers.commands.service';
import { LodgersDataModule } from 'src/app/features/lodgers/data/lodgers.data.module';
import { OwnersCommandsService } from 'src/app/features/owners/commands/owners.command.service';
import { OwnersDataModule } from 'src/app/features/owners/data/owners.data.module';
import { EstatesHandlerMenuModule } from './menu/estates-handler-menu.module';
import { DesktopEstatesHandlerComponent } from './properties.component';
import { DesktopEstatesHandlerRoutingModule } from './properties.routing';
import { RentsDataModule } from 'src/app/features/rents/data/module/rents.data.module';
import { RentsCommandsService } from 'src/app/features/rents/commands/rents.commands.service';



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
    // console.log('DesktopPropertiesModule constructor');
  }

 }
