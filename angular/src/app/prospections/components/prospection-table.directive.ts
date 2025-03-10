import { Directive, Signal } from "@angular/core";
import { ProspectionsDataService } from "../data/service/prospections.data.service";
import { Prospection } from "../models/prospection.model";

@Directive()
export class ProspectionTableDirective {

  prospections: Signal<Prospection[]> = this.dataService.getProspections();

  constructor(private dataService: ProspectionsDataService) {
    console.log('prospectionTableDirective constructor.');
    dataService.loadProspections();
  }

}
