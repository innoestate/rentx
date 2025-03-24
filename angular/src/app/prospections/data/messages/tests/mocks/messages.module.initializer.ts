import { NgModule } from "@angular/core";
import { ProspectionsDataMessagesService } from "../../prospections.messages.service";

@NgModule()
export class MessagesModuleInitializer {
  constructor(private messagesService: ProspectionsDataMessagesService){}
}
