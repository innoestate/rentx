import { NgModule } from "@angular/core";
import { OwnersCommandsService } from "./owners.command.service";

@NgModule({
  imports: [
  ]
})
export class OwnersCommandsModule {
  static forRoot() {
    return {
      ngModule: OwnersCommandsModule,
      providers: [
        OwnersCommandsService,
      ]
    };
  }
  static forChild() {
    return {
      ngModule: OwnersCommandsModule,
      providers: []
    };
  }
}
