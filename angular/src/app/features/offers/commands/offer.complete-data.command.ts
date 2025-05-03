import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { ProspectionsDataService } from "../../prospections/data/services/prospections.data.service";
import { SellersDataService } from "../../sellers/data/services/sellers.data.service";
import { UiFormFieldData } from "src/app/ui/components/ui-form/models/ui-form.field-data.model";
import { Prospection } from "../../prospections/models/prospection.model";
import { Owner } from "../../owners/models/owner.model";
import { Observable, from } from 'rxjs';
import { OwnersDataService } from "../../owners/data/owners.data.service";
import { map, switchMap, take, tap } from 'rxjs/operators';
import { UiPopupCustomizedComponent } from "src/app/ui/components/ui-popup/ui-popup-customized/ui-popup-customized.component";
import { UiButton } from "src/app/ui/components/ui-button/models/ui-buttons.model";



@Injectable()
export class OfferCompleteDataCommand {

  neededFields: UiFormFieldData[] = [
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

  constructor(protected popupService: UiPopupService,
    protected prospectionsData: ProspectionsDataService,
    protected ownersData: OwnersDataService,
    protected sellersData: SellersDataService,
    protected localizationService: LocalizationsService){
      this.initNeededFields();
    }


  completeData(owner: Owner, prospection: Prospection): Observable<void> {
    const formFields = this.buildFormFields(owner, prospection);

    if (formFields.length <= 0) {
      return from(Promise.resolve());
    }

    let popup!: UiPopupCustomizedComponent<any>;
    const buttons: UiButton<{ [key: string]: string }>[] = [
      {
        text: 'Submit',
        type: 'default',
        command: (formData: any) => {
          this.updateData(formData, owner, prospection).pipe(
            take(1),
            tap(() => popup.onClose.emit())
          ).subscribe();
        }
      }
    ];

    popup = this.popupService.openCustomizedPopup<any>(
      'Complete Missing Data',
      formFields,
      buttons
    );

    return new Observable<void>(subscriber => {
      popup.onClose.subscribe(() => {
        subscriber.next();
        subscriber.complete();
      });
    }).pipe(
      take(1),
      map(() => void 0)
    );
  }

  private initNeededFields(): UiFormFieldData[] {
    return this.neededFields = this.neededFields.map( field => {
      field.label = this.localizationService.getLocalization('offerCompleteData', field.key);
      return field;
    })
  }

  private buildFormFields(owner: Owner, prospection: Prospection): UiFormFieldData[] {
    const formFields: UiFormFieldData[] = [];

    const ownerFieldMappings = {
      street: 'ownerStreet',
      name: 'ownerName',
      zip: 'ownerZip',
      city: 'ownerCity',
      phone: 'ownerPhone',
      email: 'ownerEmail'
    };

    Object.entries(ownerFieldMappings).forEach(([ownerProp, fieldKey]) => {
      if (!owner[ownerProp as keyof Owner]) {
        formFields.push(this.neededFields.find(f => f.key === fieldKey)!);
      }
    });

    formFields.push(this.neededFields.find(f => f.key === 'ownerSignature')!);

    const sellerFieldMappings = {
      name: 'sellerName',
      street: 'sellerStreet',
      zip: 'sellerZip',
      city: 'sellerCity',
      phone: 'sellerPhone',
      email: 'sellerEmail'
    };

    Object.entries(sellerFieldMappings).forEach(([sellerProp, fieldKey]) => {
      if (!prospection.seller?.[sellerProp]) {
        formFields.push(this.neededFields.find(f => f.key === fieldKey)!);
      }
    });

    return formFields;
  }

  private updateData(formData: any, owner: Owner, prospection: Prospection): Observable<void> {
    const updates: Observable<any>[] = [];

    const ownerUpdates: Partial<Owner> = {};
    if (formData.ownerName) ownerUpdates.name = formData.ownerName;
    if (formData.ownerStreet) ownerUpdates.street = formData.ownerStreet;
    if (formData.ownerZip) ownerUpdates.zip = formData.ownerZip;
    if (formData.ownerCity) ownerUpdates.city = formData.ownerCity;
    if (formData.ownerPhone) ownerUpdates.phone = formData.ownerPhone;
    if (formData.ownerEmail) ownerUpdates.email = formData.ownerEmail;
    if (formData.ownerSignature) ownerUpdates.signature = formData.ownerSignature;

    if (Object.keys(ownerUpdates).length > 0) {
      updates.push(this.ownersData.updateOwner(owner.id, {
        ...owner,
        ...ownerUpdates
      }));
    }

    const sellerUpdates: any = {};
    if (formData.sellerName) sellerUpdates.name = formData.sellerName;
    if (formData.sellerStreet) sellerUpdates.street = formData.sellerStreet;
    if (formData.sellerZip) sellerUpdates.zip = formData.sellerZip;
    if (formData.sellerCity) sellerUpdates.city = formData.sellerCity;
    if (formData.sellerPhone) sellerUpdates.phone = formData.sellerPhone;
    if (formData.sellerEmail) sellerUpdates.email = formData.sellerEmail;

    if (Object.keys(sellerUpdates).length > 0) {
      updates.push(this.sellersData.updateSeller( prospection.seller?.id, {
        ...prospection.seller,
        ...sellerUpdates
      }));
    }

    if (updates.length === 0) {
      return from(Promise.resolve());
    }

    return from(updates).pipe(
      switchMap(update => update),
      map(() => void 0)
    );
  }
}
