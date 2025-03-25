import { NgModule } from "@angular/core";
import { SellersDataMessagesService } from "../../sellers.data.messages.service";

@NgModule()
export class SellersDataMessagesModuleInitializer {
  constructor(private messagesService: SellersDataMessagesService){}
}
