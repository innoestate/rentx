import { UxTableColumnItem } from "src/app/ux/components/ux-table/models/ux-table.column.model";

export const estatesColumnItems: UxTableColumnItem[] = [
  { key: 'address', label: 'Adresse' },
  { key: 'plot', label: 'lot', editable: true },
  { key: 'rent', label: 'loyer', editable: true },
  { key: 'charges', label: 'charges', editable: true },
  { key: 'owner', label: 'propriétaire' },
  { key: 'lodger', label: 'locataire' },
  { key: 'actions', label: 'Actions' }
];
