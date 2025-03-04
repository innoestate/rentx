import { Injectable } from "@angular/core";
import { OwnersDataService } from "../data/owners.data.service";

@Injectable({
  providedIn: 'root'
})
export class OwnersCommands {

  constructor(private ownersDataService: OwnersDataService) { }

  deleteOwner(ownerId: string) {
    this.ownersDataService.deleteOwner(ownerId);
  }

}
