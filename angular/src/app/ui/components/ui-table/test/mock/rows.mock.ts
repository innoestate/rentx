import { UiDropdownItem } from "../../../ui-dropdown/model/ui-dropdown-item.model";

export interface RowMock {
  data: any;
  cells: {
    id: string;
    name: string;
    email: string;
    phone: string;
    zip: number;
    language: UiDropdownItem<string>;
    skills: UiDropdownItem<string>;
  }
}

export const rowsMockItems: RowMock[] = [
  {
    data:   {
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
    cells:   {
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
    }
  },
  {
    data: {
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
    },
    cells: {
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
  }
]
