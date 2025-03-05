import { ModuleWithProviders, NgModule } from "@angular/core";
import { LodgersCommandsService } from "./lodgers.commands.service";

@NgModule()
export class LodgersCommandsModule {
  static forRoot(): ModuleWithProviders<LodgersCommandsModule> {
    return {
      ngModule: LodgersCommandsModule,
      providers: [
        LodgersCommandsService
      ]
    };
  }
  static forChild(): ModuleWithProviders<LodgersCommandsModule> {
    return {
      ngModule: LodgersCommandsModule,
      providers: []
    };
  }
}
