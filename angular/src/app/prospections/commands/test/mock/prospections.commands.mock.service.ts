import { Injectable } from '@angular/core';
import { Seller_Dto } from 'src/app/sellers/models/seller.dto.model';
import { Prospection_Dto } from 'src/app/prospections/models/prospection.dto.model';
import { FormPopupFieldData } from 'src/app/views/common/popups/form-popup/models/form-popup.fields-data.model';

@Injectable({
  providedIn: 'root'
})
export class ProspectionsCommandsMockService {

  delete(id: string) {
    console.log(`Mock delete called with id: ${id}`);
  }

  createNew(sellers: Seller_Dto[]) {
    console.log('Mock createNew called with sellers:', sellers);
    return {
      fields: this.getCreateNewFields(sellers),
      onValidate: (prospection: Prospection_Dto) => {
        console.log('Mock onValidate called with prospection:', prospection);
      }
    };
  }

  private getCreateNewFields(sellers: Seller_Dto[]): FormPopupFieldData[] {
    return [
      {
        key: 'address',
        label: 'rue',
        type: 'text'
      },
      {
        key: 'city',
        label: 'Ville',
        type: 'text'
      },
      {
        key: 'zip',
        label: 'Code postal',
        type: 'text'
      },
      {
        key: 'link',
        label: 'lien',
        type: 'text'
      },
      {
        key: 'seller_id',
        label: 'Vendeur',
        type: 'dropdown',
        dropdownItems: sellers.map((seller) => ({ value: seller.id, label: seller.name }))
      }
    ];
  }
}