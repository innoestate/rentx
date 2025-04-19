import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesDesktopRoutingModule } from './properties.routing';
import { DesktopPropertiesComponent } from './properties.component';
import { EstatesModule } from './modules/estates/estates.module';
import { OwnersModule } from './modules/owners/owners.module';
import { LodgersModule } from './modules/lodgers/lodgers.module';
import { UiDynamicComponentComponent } from 'src/app/ui/components/ui-dynamic-component/ui-dynamic-component.component';
import { EstatesCommandsService } from 'src/app/features/estates/commands/estates.commands.service';
import { OwnersCommandsService } from 'src/app/features/owners/commands/owners.command.service';
import { LodgersCommandsService } from 'src/app/features/lodgers/commands/lodgers.commands.service';
import { RentsCommandsService } from 'src/app/features/rents/commands/rents.commands.service';
import { StoreModule } from '@ngrx/store';
import { propertiesReducer } from 'src/app/features/properties/states/display/ngrx/properties.reducers';
import { EstatesDataModule } from 'src/app/features/estates/data/module/estates.data.module';
import { OwnersDataModule } from 'src/app/features/owners/data/owners.data.module';
import { LodgersDataModule } from 'src/app/features/lodgers/data/lodgers.data.module';
import { RentsDataModule } from 'src/app/features/rents/data/module/rents.data.module';
import { PropertiesDisplayerManager } from 'src/app/features/properties/displayer/properties.displayer.manager';
import { PropertiesDisplayAdapter } from 'src/app/features/properties/adapter/properties.displayer.adapter';
import { PropertiesDisplayStoreFacade } from 'src/app/features/properties/states/display/facades/properties.display-store.facade';
import { DynamicComponentFactoryService } from 'src/app/ui/services/factory/dynamic-component-factory.service';
import { PropertiesFactory } from './factories/prospections.factory';
import { DisplayerManager } from 'src/app/ui/displayers/displayer.manager';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopEstatesCommandsService } from './commands/desktop.estates.command';
import { DesktopLodgersCommandsService } from './commands/deskop.lodgers.command';
import { DesktopOwnersCommandsService } from './commands/desktop.owners.command';



@NgModule({
  declarations: [
    DesktopPropertiesComponent
  ],
  imports: [
    CommonModule,
    PropertiesDesktopRoutingModule,
    StoreModule.forFeature('properties', propertiesReducer),
    EstatesDataModule,
    OwnersDataModule,
    LodgersDataModule,
    RentsDataModule,
    EstatesModule,
    OwnersModule,
    LodgersModule,
    UiDynamicComponentComponent,
    UiModule.forChild(),
  ],
  providers: [
    {
      provide: EstatesCommandsService,
      useClass: DesktopEstatesCommandsService
    },
    {
      provide: LodgersCommandsService,
      useClass: DesktopLodgersCommandsService
    },
    {
      provide: OwnersCommandsService,
      useClass: DesktopOwnersCommandsService
    },
    RentsCommandsService,
    PropertiesDisplayerManager,
    PropertiesDisplayAdapter,
    PropertiesDisplayStoreFacade,
    {
      provide: DynamicComponentFactoryService,
      useClass: PropertiesFactory
    },
    {
      provide: DisplayerManager,
      useClass: PropertiesDisplayerManager
    }
  ]
})
export class DesktopPropertiesModule { }
