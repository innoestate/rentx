import { UxTableColumnItem } from "../../models/ux-table.column.model";

export const columnsWithCityAsDropDownMock: UxTableColumnItem[] = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'Name',
    editable: true,
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'phone',
    label: 'Phone'
  },
  {
    key: 'zip',
    label: 'Zip',
  },
  {
    key: 'language',
    label: 'Langue',
    dropDownItems: [
      {
        label: 'Français',
        target: 'fr'
      },
      {
        label: 'English',
        target: 'en'
      },
      {
        label: 'Espagnol',
        target: 'es'
      }
    ],
  }
]
