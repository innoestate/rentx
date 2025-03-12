import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { userReducer } from "../ngrx/user.reducers";
import { EffectsModule } from "@ngrx/effects";
import { UserEffects } from "../ngrx/user.effects";
import { UserDataMessagesService } from "../message/user.data.message.service";

@NgModule({
  imports: [
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects])
  ]
})
export class UserDataModule {

  constructor(private messageService: UserDataMessagesService){

  }

}