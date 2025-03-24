import { NgModule } from "@angular/core";
import { ProspectionsDataMessagesService } from "../../prospections.messages.service";

@NgModule()
export class MessageModuleInitializer {
  constructor(private messageService: ProspectionsDataMessagesService){}
}
