import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { ProspectionsDataService } from "../../prospections/data/services/prospections.data.service";
import { SellersDataService } from "../../sellers/data/services/sellers.data.service";
import { UiFormFieldData } from "src/app/ui/components/ui-form/models/ui-form.field-data.model";

const neededFields: UiFormFieldData[] = [
  {
    key: 'ownerName',
    label: 'ownerName',
    type: 'text',
    required: true
  },
  {
    key: 'ownerStreet',
    label: 'ownerStreet',
    type: 'text',
    required: true
  },
  {
    key: 'ownerZip',
    label: 'ownerZip',
    type: 'text',
    required: true
  },
  {
    key: 'ownercity',
    label: 'ownerCity',
    type: 'text',
    required: true
  },
  {
    key: 'ownerPhone',
    label: 'ownerPhone',
    type: 'text',
    required: false
  },
  {
    key: 'ownerEmail',
    label: 'ownerEmail',
    type: 'text',
    required: false
  },
  {
    key: 'ownerSignature',
    label: 'ownerSignature',
    type: 'signature',
    required: true
  },

  {
    key: 'sellerName',
    label: 'sellerName',
    type: 'text',
    required: true
  },
  {
    key: 'sellerStreet',
    label: 'sellerStreet',
    type: 'text',
    required: true
  },
  {
    key: 'sellerZip',
    label: 'sellerZip',
    type: 'text',
    required: true
  },
  {
    key: 'sellerCity',
    label: 'sellerCity',
    type: 'text',
    required: true
  },
  {
    key: 'sellerPhone',
    label: 'sellerPhone',
    type: 'text',
    required: false
  },
  {
    key: 'sellerEmail',
    label: 'sellerEmail',
    type: 'text',
    required: false
  }
]

@Injectable()
export class OffersCompleteDataCommand {

  constructor(protected popupService: UiPopupService,
    protected prospectionsData: ProspectionsDataService,
    protected sellersData: SellersDataService,
    protected localizationService: LocalizationsService){}



}