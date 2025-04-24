import { Injectable } from "@angular/core";
import { catchError, combineLatest, delay, from, map, Observable, of, take, tap } from "rxjs";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { UiButton } from "src/app/ui/components/ui-button/models/ui-buttons.model";
import { UiFormFieldData } from "src/app/ui/components/ui-form/models/ui-form.field-data.model";
import { UiPopupCustomizedComponent } from "src/app/ui/components/ui-popup/ui-popup-customized/ui-popup-customized.component";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { EstatesDataService } from "../../estates/data/service/esates.data.service";
import { Estate } from "../../estates/models/estate.model";
import { LodgersDataService } from "../../lodgers/data/lodgers.data.service";
import { Lodger } from "../../lodgers/models/lodger.model";
import { OwnersDataService } from "../../owners/data/owners.data.service";
import { Owner } from "../../owners/models/owner.model";

interface ObjectsUpdates {
  owner: Partial<Owner>,
  lodger: Partial<Lodger>,
  estate: Partial<Estate>
}

export const customizedFields: UiFormFieldData[] = [
  {
    key: 'startDate',
    type: 'date',
    label: 'Date de début',
    required: true
  },
  {
    key: 'endDate',
    type: 'date',
    label: 'Date de fin',
    required: true
  }
];

const getCompletedObjects = (data: any ): ObjectsUpdates => {
  let owner: Partial<Owner> = {};
  if (data['street']) {
    owner.street = data['street'];
  }
  if (data['city']) {
    owner.city = data['city'];
  }
  if (data['zip']) {
    owner.zip = data['zip'];
  }
  if (data['signature']) {
    owner.signature = data['signature'];
  }
  if (data['ownerEmail']) {
    owner.email = data['ownerEmail'];
  }

  let estate: Partial<Estate> = {};
  if (data['rent']) {
    estate.rent = data['rent'];
  }
  if (data['charges']) {
    estate.charges = data['charges'];
  }

  let lodger: Partial<Lodger> = {};
  if (data['lodgerEmail']) {
    lodger.email = data['lodgerEmail'];
  }
  return { owner, lodger, estate };
}

@Injectable({
  providedIn: 'root'
})
export class CompleteInformationsCommandService {
  constructor(private popupService: UiPopupService,
              private estatesData: EstatesDataService,
              private ownersData: OwnersDataService,
              private lodgersData: LodgersDataService,
              private localizations: LocalizationsService
  ) { }

  completeInformations(fields: string[], ownerId?: string, estateId?: string, lodgerId?: string): Observable<void> {
    const promise = new Promise<void>((resolve) => {
      let popup!: UiPopupCustomizedComponent<{ [key: string]: string }>;
      const fieldsData = this.buildFields(fields);
      const buttons: UiButton<{ [key: string]: string }>[] = [
        {
          text: 'Compléter',
          type: 'default',
          command: (data) => {
            const updates = getCompletedObjects(data);
            this.updateCompletedObjects({ ...updates.owner, id: ownerId }, { ...updates.estate, id: estateId }, { ...updates.lodger, id: lodgerId }).pipe(
              take(1),
              tap(() => popup.onClose.emit()),
              tap(() => resolve())
            ).subscribe();
          }
        }
      ];
      popup = this.popupService.openCustomizedPopup('Compléter les informations pour la quittance', fieldsData, buttons);
    });
    return from(promise);
  }

  private buildFields(fields: string[]): UiFormFieldData[] {
    return fields.map(field => ({
      key: field,
      label: this.localizations.getLocalization('rentReceiptsCompleteData', field),
      type: field === 'signature' ? 'signature' : 'text',
      required: true
    }));
  }

  private updateCompletedObjects(owner: Partial<Owner>, estate: Partial<Estate>, lodger?: Partial<Lodger>): Observable<boolean> {
    let asyncUpdates: Observable<any>[] = [];
    if (Object.keys(owner).length > 1) {
      asyncUpdates.push(this.ownersData.updateOwner(owner?.id!, { ...owner }));
    }
    if (Object.keys(estate).length > 1) {
      asyncUpdates.push(this.estatesData.updateEstate(estate?.id!, { ...estate }));
    }
    if (lodger && Object.keys(lodger).length > 1) {
      asyncUpdates.push(this.lodgersData.updateLodger(lodger?.id!, { ...lodger }));
    }
    return combineLatest(asyncUpdates).pipe(
      take(1),
      delay(0),
      catchError(err => of(false)),
      map(_ => true)
    );
  }

}