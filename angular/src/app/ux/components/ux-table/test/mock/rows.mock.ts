import { UxDropdownItem } from "../../../ux-dropdown/model/ux-dropdown-item.model";

export interface RowMock {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip: number;
  language: UxDropdownItem<string>;
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
      target: 'fr'
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
      target: 'en'
    }
  }
]
