import { UiDropdownItem } from "../../../ui-dropdown/model/ui-dropdown-item.model";

export interface RowMock {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip: number;
  language: UiDropdownItem<string>;
  skills: UiDropdownItem<string>;
}

export const rowsMockItems: RowMock[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    zip: 10000,
    language: {
      label: 'Français',
      value: 'fr'
    },
    skills: {
      label: 'Developer',
      value: 'dev'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '9876543210',
    zip: 12345,
    language: {
      label: 'English',
      value: 'en'
    },
    skills: {
      label: 'ui designer',
      value: 'ui'
    }
  }
]
