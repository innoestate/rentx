import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { FormPopupFieldData } from "src/app/ui/components/ui-form/form-popup/models/form-popup.fields-data.model";

export abstract class ProspectionsCommandsService {

  constructor() { }

  delete(id: string) { }

  createNew(sellers: Seller_Dto[]) { }

  getCreateNewFormFields(sellers: Seller_Dto[]): FormPopupFieldData[] {
    const fields: FormPopupFieldData[] = [
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
        type: 'text',
        required: true
      },
    ]

    if (sellers?.length > 0) {

      const dropDown = sellers.map((seller) => ({ value: seller.id, label: seller.name }));
      dropDown.push({ value: '', label: 'Aucun' })

      fields.push({
        key: 'seller_id',
        label: 'Vendeur',
        type: 'dropdown',
        dropdownItems: dropDown
      });
    }

    return fields;
  }

}
