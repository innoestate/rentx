import { Lodger } from "src/app/core/models/lodger.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { EstatesCommandsService } from "../../commands/estates.commands.service";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { Estate } from "../../models/estate.model";
import { RentsCommandsService } from "src/app/rents/commands/rents.commands.service";

export const createLodgersDropdown = (estatesCommands: EstatesCommandsService, lodgers: Lodger[], estates: Estate[]) => {
  let lodgerDropdownItems: UiDropdownItem<any>[] = [];
  lodgerDropdownItems = addChoosingLodger(estatesCommands, estates, lodgers);
  const lodgersDropDown = {
    value: lodgerDropdownItems,
    label: "locataires"
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

const addChoosingLodger = (estatesCommands: EstatesCommandsService, estates: Estate[], lodgers: Lodger[]): UiDropdownItem<any>[] => {
  let lodgersDropDownItems: UiDropdownItem<any>[] = lodgers.map(lodger => ({ value: lodger.id, label: lodger.name }));
  lodgersDropDownItems.push({
    value: '',
    label: "vacant"
  })
  lodgersDropDownItems = addCreatingLodger(lodgersDropDownItems, estatesCommands, estates);
  return lodgersDropDownItems;
}

const addCreatingLodger = (dropDownActionsItems: UiDropdownItem<any>[], estatesCommands: EstatesCommandsService, estates: Estate[]): UiDropdownItem<any>[]  => {
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

const addDownloadRentReceipt = (dropDownActionsItems: UiDropdownItem<any>[], rentsCommands: RentsCommandsService, estates: Estate[]): UiDropdownItem<any>[] => {
  dropDownActionsItems.push({
    value: 'downloadRentReceipt',
    label: 'téléharger une quittance',
    command: ( estateRow: any ) => {
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
    command: ( estateRow: any ) => {
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
    command: ( estateRow: any ) => {
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
