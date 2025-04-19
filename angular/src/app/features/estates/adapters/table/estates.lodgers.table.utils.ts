import { LodgersCommandsService } from "src/app/features/lodgers/commands/lodgers.commands.service";
import { Lodger } from "src/app/features/lodgers/models/lodger.model";
import { RentsCommandsService } from "src/app/features/rents/commands/rents.commands.service";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { getUpdatedFields as getUpdatedFieldsUtils } from "../../../../shared/utils/objects.utils";
import { Estate } from "../../models/estate.model";

export const createLodgersDropdown = (lodgersCommands: LodgersCommandsService, lodgers: Lodger[], estates: Estate[]) => {
  let lodgerDropdownItems: UiDropdownItem<any>[] = [];
  lodgerDropdownItems = addChoosingLodger(lodgersCommands, estates, lodgers);
  const lodgersDropDown = {
    value: lodgerDropdownItems,
    label: "locataires",
    icon: 'lodger'
  }
  return lodgersDropDown;
}

export const createRentReceiptDropdown = (rentsCommands: RentsCommandsService, estates: Estate[]) => {
  let rentReceiptDropdownItems: UiDropdownItem<any>[] = [];
  rentReceiptDropdownItems = addDownloadRentReceipt(rentReceiptDropdownItems, rentsCommands, estates);
  rentReceiptDropdownItems = sendRentReceiptByEmail(rentReceiptDropdownItems, rentsCommands, estates);
  rentReceiptDropdownItems = addCustomizeRentReceipt(rentReceiptDropdownItems, rentsCommands, estates);
  return {
    value: rentReceiptDropdownItems,
    label: "quittances de loyers"
  };
}

const addChoosingLodger = (lodgersCommands: LodgersCommandsService, estates: Estate[], lodgers: Lodger[]): UiDropdownItem<any>[] => {
  let lodgersDropDownItems: UiDropdownItem<any>[] = lodgers.map(lodger => ({ value: lodger.id, label: lodger.name, icon: 'lodger' }));
  lodgersDropDownItems.push({
    value: '',
    label: "vacant"
  })
  lodgersDropDownItems = addCreatingLodger(lodgersDropDownItems, lodgersCommands, estates);
  return lodgersDropDownItems;
}

const addCreatingLodger = (dropDownActionsItems: UiDropdownItem<any>[], lodgersCommands: LodgersCommandsService, estates: Estate[]): UiDropdownItem<any>[] => {
  dropDownActionsItems.push({
    value: '',
    command: (estateRow: UiTableRow) => {
      lodgersCommands.createLodger()
      return true;
    },
    label: "créer un locataire"
  })
  return dropDownActionsItems;
}

const addDownloadRentReceipt = (dropDownActionsItems: UiDropdownItem<any>[], rentsCommands: RentsCommandsService, estates: Estate[]): UiDropdownItem<any>[] => {
  dropDownActionsItems.push({
    value: 'downloadRentReceipt',
    label: 'téléharger une quittance',
    command: (estateRow: any) => {
      const estate = extractEstateFromRow(estates, estateRow);
      rentsCommands.downloadRentReceipt(estate);
      return true;
    }
  })
  return dropDownActionsItems;
}

const sendRentReceiptByEmail = (dropDownActionsItems: UiDropdownItem<any>[], rentsCommands: RentsCommandsService, estates: Estate[]): UiDropdownItem<any>[] => {
  dropDownActionsItems.push({
    value: 'sendRentReceipt',
    label: 'envoyer une quittance par email',
    command: (estateRow: any) => {
      const estate = extractEstateFromRow(estates, estateRow);
      rentsCommands.senRentReceiptByEmail(estate);
      return true;
    }
  })
  return dropDownActionsItems;
}

const addCustomizeRentReceipt = (dropDownActionsItems: UiDropdownItem<any>[], rentsCommands: RentsCommandsService, estates: Estate[]): UiDropdownItem<any>[] => {
  dropDownActionsItems.push({
    value: 'customizeRentReceipt',
    label: 'quittance personnalisée',
    command: (estateRow: any) => {
      const estate = extractEstateFromRow(estates, estateRow);
      rentsCommands.customizeRentReceipt(estate);
      return true;
    }
  })
  return dropDownActionsItems;
}

export const extractEstateFromRow = (estates: Estate[], row: UiTableRow): Estate => {
  const estate = estates.find(estate => estate.id === row.data['id']);
  if (!estate) throw new Error('Estate not matching with table row');
  return estate;
}

export const extractUpdatedFieldsFromRow = (estates: Estate[], row: UiTableRow): Record<string, any> =>{
  const estate = estates.find(estate => estate.id === row.data['id']);
  if (!estate) throw new Error('Estate not matching with table row');

  const updatedFields = getUpdatedFields(estate, row);

  return {
    id: estate.id,
    ...updatedFields
  }
}

export const getUpdatedFields = (estate: Estate, row: UiTableRow) => {
  const potentialUpdatedFields: Partial<Estate> = {
    plot: row.cells['plot'] as string,
    rent: row.cells['rent'] as number,
    charges: row.cells['charges'] as number,
    owner_id: (row.cells['owner_dropdown'] as UiDropdownItem<any>)?.value,
    lodger_id: (row.cells['lodger_dropdown'] as UiDropdownItem<any>)?.value,
  }
  return getUpdatedFieldsUtils<Partial<Estate>>(estate, potentialUpdatedFields);
}
