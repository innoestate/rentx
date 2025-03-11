import { Injectable } from "@angular/core";
import { ProspectionsDataService } from "../data/service/prospections.data.service";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsCommandsService {

  constructor(private prospectionsDataService: ProspectionsDataService) { }

  delete(id: string) {
    this.prospectionsDataService.deleteProspection(id);
  }

}
