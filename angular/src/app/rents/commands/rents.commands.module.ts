import { ModuleWithProviders, NgModule } from "@angular/core";
import { RentsCommandsService } from "./rents.commands.service";

@NgModule({
  providers: []
})
export class RentsCommandsModule {

  static forRoot(): ModuleWithProviders<RentsCommandsModule> {
    return {
      ngModule: RentsCommandsModule,
      providers: [
        RentsCommandsService,
      ]
    };
  }

  static forFeature(): ModuleWithProviders<RentsCommandsModule> {
    return {
      ngModule: RentsCommandsModule,
      providers: []
    };
  }

}
