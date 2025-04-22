import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { UiNestedDropdown2 } from "src/app/ui/components/ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { Lodger } from "../../lodgers/models/lodger.model";
import { Estate } from "../models/estate.model";



export const createLodgerDropdown = (estate: Estate, lodgers: Lodger[], localization: LocalizationsService): UiNestedDropdown2 => {

  const hasPay = (estate.lodger?.name && estate.actualMonthPaid) ?? false;

  return {
    label: { title: { label: estate.lodger?.name ?? '' }, color: hasPay ? 'var(--color-success-500)' : undefined },
    list: getLodgerDropdownList(lodgers, estate.lodger?.name, localization)
  };
}

const getLodgerDropdownList = (lodgers: Lodger[], lodgerName: string | undefined, localization: LocalizationsService): UiNestedDropdown2[] => {
  const list: UiNestedDropdown2[] = [];
  if (lodgers.length > 0) {
    list.push(assignLodgers(lodgers, lodgerName, localization));
  }
  if (lodgerName) {
    list.push(rentReceipt(localization));
  }
  list.push(createNewLodger(localization));
  if (lodgerName) {
    list.push(exitLodger(localization));
  }
  return list;
}

const rentReceipt = (localization: LocalizationsService): UiNestedDropdown2 => {
  return {
    label: {
      title: { label: localization.getLocalization('rentReceipts', 'label') },
      icon: { name: 'file-invoice', size: 24, color: 'var(--color-secondary-500)' },
    },
    list: [
      {
        label: {
          icon: { name: 'download-file', size: 22, color: 'var(--color-tertiary-500)' },
          title: { label: localization.getLocalization('rentReceipts', 'download') },
          command: () => {
            console.log('implement download method in component');
            return true;
          }
        },
      },
      {
        label: {
          icon: { name: 'send', size: 22, color: 'var(--color-tertiary-500)' },
          title: { label: localization.getLocalization('rentReceipts', 'send') },
          command: () => {
            console.log('implement send method in component');
            return true;
          }
        },
      },
      {
        label: {
          icon: { name: 'gear', size: 22, color: 'var(--color-secondary-500)' },
          title: { label: localization.getLocalization('estates', 'personalize') },
          command: () => {
            console.log('implement personalization method in component');
            return true;
          }
        },
      }
    ]
  }
}

const exitLodger = (localization: LocalizationsService): UiNestedDropdown2 => {
  return {
    label: {
      icon: { name: 'empty-house', size: 24, color: 'var(--color-secondary-500)' },
      title: { label: localization.getLocalization('estates', 'freeLodger') },
      command: () => {
        return true;
      }
    }
  }
}

const createNewLodger = (localization: LocalizationsService): UiNestedDropdown2 => {
  return {
    label: {
      icon: { name: 'add-lodger', size: 24, color: 'var(--color-secondary-500)' },
      title: { label: localization.getLocalization('lodgers', 'create') },
      command: () => {
        return true;
      }
    }
  }
}

const assignLodgers = (lodgers: Lodger[], lodgerName: string | undefined, localization: LocalizationsService): UiNestedDropdown2 => {

  const iconName = lodgerName ? 'people-replace' : 'person-in';
  const title = lodgerName ? localization.getLocalization('lodgers', 'change') : localization.getLocalization('lodgers', 'set');

  const lodgerItems = lodgers.filter(lodger => lodger.name !== lodgerName).map(lodger => ({
    label: {
      title: { label: lodger.name }
    }
  }));


  return {
    label: {
      icon: { name: iconName, size: 24, color: 'var(--color-secondary-500)' },
      title: { label: title },
    },
    list: lodgerItems
  };
}