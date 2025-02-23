export interface RowMock {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const rowsMockItems: RowMock[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '9876543210'
  }
]
