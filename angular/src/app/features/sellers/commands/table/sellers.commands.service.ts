import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { UiFormFieldData } from "src/app/ui/components/ui-form/form-popup/models/ui-form.field-data.model";
import { SellersDataService } from "../../data/services/sellers.data.service";

@Injectable({
  providedIn: 'root'
})
export class SellersCommandsService {

  constructor(protected sellersData: SellersDataService,
    protected localizationsService: LocalizationsService) { }

  createNew() {
    console.log('implement adapted method in displays.')
  }

  delete(id: string) {
    this.sellersData.deleteSeller(id);
  }

  protected getCreateFields(): UiFormFieldData[] {
    return [
      {
        key: 'name',
        label: 'Nom et Prénom',
        type: 'text',
        required: true
      },
      {
        key: 'address',
        label: 'Rue',
        type: 'text',
      },
      {
        key: 'city',
        label: 'Ville',
        type: 'text',
      },
      {
        key: 'zip',
        label: 'Code postal',
        type: 'text',
      },
      {
        key: 'phone',
        label: 'téléphone',
        type: 'text',
      },
      {
        key: 'email',
        label: 'email',
        type: 'text',
      },
      {
        key: 'agency',
        label: 'Agence',
        type: 'text',
      },
    ]
  }
}
