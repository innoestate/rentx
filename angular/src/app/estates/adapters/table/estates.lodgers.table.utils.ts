import { Estate } from "src/app/core/models/estate.model";
import { Lodger } from "src/app/core/models/lodger.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { EstatesCommandsProvider } from "../../commands/estates.commands.provider";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";

export const createLodgersDropdown = (estatesCommands: EstatesCommandsProvider, lodgers: Lodger[], estates: Estate[]) => {
  let lodgerDropdownItems: UiDropdownItem<any>[] = [];
  lodgerDropdownItems = addChoosingLodger(estatesCommands, estates, lodgers);
  const lodgersDropDown = {
    value: lodgerDropdownItems,
    label: "locataires"
  }
  return lodgersDropDown;
}

export const createRentReceiptDropdown = (estatesCommands: EstatesCommandsProvider, estates: Estate[]) => {
  let rentReceiptDropdownItems: UiDropdownItem<any>[] = [];
  rentReceiptDropdownItems = addDownloadRentReceipt(rentReceiptDropdownItems, estatesCommands, estates);
  rentReceiptDropdownItems = sendRentReceiptByEmail(rentReceiptDropdownItems, estatesCommands, estates);
  rentReceiptDropdownItems = addCustomizeRentReceipt(rentReceiptDropdownItems, estatesCommands, estates);
  return {
    value: rentReceiptDropdownItems,
    label: "quittances de loyers"
  };
}

const addChoosingLodger = (estatesCommands: EstatesCommandsProvider, estates: Estate[], lodgers: Lodger[]): UiDropdownItem<any>[] => {
  let lodgersDropDownItems: UiDropdownItem<any>[] = lodgers.map(lodger => ({ value: lodger.id, label: lodger.name }));
  lodgersDropDownItems.push({
    value: '',
    label: "vacant"
  })
  lodgersDropDownItems = addCreatingLodger(lodgersDropDownItems, estatesCommands, estates);
  return lodgersDropDownItems;
}

const addCreatingLodger = (dropDownActionsItems: UiDropdownItem<any>[], estatesCommands: EstatesCommandsProvider, estates: Estate[]): UiDropdownItem<any>[]  => {
  dropDownActionsItems.push({
    value: '',
    command: (estateRow: UiTableRow) => {
      const estate = extractEstateFromRow(estates, estateRow);
      estatesCommands.createLodger(estate)
      return true;
    },
    label: "créer un locataire"
  })
  return dropDownActionsItems;
}

const addDownloadRentReceipt = (dropDownActionsItems: UiDropdownItem<any>[], estatesCommands: EstatesCommandsProvider, estates: Estate[]): UiDropdownItem<any>[] => {
  dropDownActionsItems.push({
    value: 'downloadRentReceipt',
    label: 'téléharger une quittance',
    command: ( estateRow: any ) => {
      const estate = extractEstateFromRow(estates, estateRow);
      estatesCommands.downloadRentReceipt(estate);
      return true;
    }
  })
  return dropDownActionsItems;
}

const sendRentReceiptByEmail = (dropDownActionsItems: UiDropdownItem<any>[], estatesCommands: EstatesCommandsProvider, estates: Estate[]): UiDropdownItem<any>[] => {
  dropDownActionsItems.push({
    value: 'sendRentReceipt',
    label: 'envoyer une quittance par email',
    command: ( estateRow: any ) => {
      const estate = extractEstateFromRow(estates, estateRow);
      estatesCommands.senRentReceiptByEmail(estate);
      return true;
    }
  })
  return dropDownActionsItems;
}

const addCustomizeRentReceipt = (dropDownActionsItems: UiDropdownItem<any>[], estatesCommands: EstatesCommandsProvider, estates: Estate[]): UiDropdownItem<any>[] => {
  dropDownActionsItems.push({
    value: 'customizeRentReceipt',
    label: 'quittance personnalisée',
    command: ( estateRow: any ) => {
      const estate = extractEstateFromRow(estates, estateRow);
      estatesCommands.customizeRentReceipt(estate);
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
