import { ModuleWithProviders, NgModule } from '@angular/core';
import { EstatesCommandsService } from './estates.commands.service';
import { OwnersDataModule } from 'src/app/owners/data/owners.data.module';
import { EstatesDataModule } from '../data/estates.data.module';



@NgModule({
  imports: [
    EstatesDataModule.forChild(),
    OwnersDataModule.forChild()
  ]
})
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
