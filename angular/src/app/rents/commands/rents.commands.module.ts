import { ModuleWithProviders, NgModule } from "@angular/core";
import { RentsCommandsService } from "./rents.commands.service";
import { RentService } from "src/app/common/services/rents.service";

@NgModule({
  providers: []
})
export class RentsCommandsModule {

  static forRoot(): ModuleWithProviders<RentsCommandsModule> {
    return {
      ngModule: RentsCommandsModule,
      providers: [
        RentsCommandsService,
        RentService
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
