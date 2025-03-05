import { ModuleWithProviders, NgModule } from '@angular/core';
import { EstatesCommandsService } from './estates.commands.service';



@NgModule()
export class EstatesCommandsModule {
  constructor() {
    console.log('EstatesCommandsModule constructor');
  }

  static forRoot(): ModuleWithProviders<EstatesCommandsModule> {
    return {
      ngModule: EstatesCommandsModule,
      providers: [
        EstatesCommandsService,
      ]
    }
  }
  static forChild(): ModuleWithProviders<EstatesCommandsModule> {
    return {
      ngModule: EstatesCommandsModule,
      providers: []
    }
  }

}
