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
  },
  {
    key: 'skills',
    label: 'Compétences',
    dropDownItems: [
      {
        label: 'Developer',
        target: 'dev'
      },
      {
        label: 'Ux designer',
        target: 'ux'
      },
      {
        label: 'Product owner',
        target: 'po'
      },
      {
        label: 'R&D',
        target: [
          {
            label: 'Product owner',
            target: 'po'
          },
          {
            label: 'Developer',
            target: 'dev'
          },
          {
            label: 'Ux designer',
            target: 'ux'
          },
        ]
      },
      {
        label: 'Sales',
        target: [
          {
            label: 'Dirrecteur de vente',
            target: 'sales director'
          },
          {
            label: 'Setter',
            target: 'setter'
          }
        ]
      }
    ],
  }
]
