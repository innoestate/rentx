import { NgModule } from "@angular/core";
import { ProspectionsDataMessagesService } from "../../prospections.data.messages.service";

@NgModule()
export class ProspectionsDataMessagesModuleInitializer {
  constructor(private messagesService: ProspectionsDataMessagesService){}
}
