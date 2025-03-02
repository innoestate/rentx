import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";

export const estatesColumnItems: UiTableColumnItem[] = [
  { key: 'address', label: 'Adresse' },
  { key: 'plot', label: 'lot', editable: true },
  { key: 'rent', label: 'loyer', editable: true },
  { key: 'charges', label: 'charges', editable: true },
  { key: 'owner', label: 'propriétaire' },
  { key: 'lodger', label: 'locataire' },
  { key: 'actions', label: 'Actions' }
];
