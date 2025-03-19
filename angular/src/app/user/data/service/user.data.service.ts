import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service";
import { loadUser, loadUserFailure, loadUserSuccess } from "../ngrx/user.actions";
import { selectUser } from "../ngrx/user.selectors";
import { User_Dto } from "../../models/user.dto.model";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private dataService: DataNgrxService, private store: Store) { }

  loadUser() {
    return this.dataService.DispatchWithFailOrSuccessActionsInNgrx<User_Dto>(loadUser, loadUserSuccess, loadUserFailure, {});
  }

  get() {
    return this.store.select(selectUser);
  }

}
