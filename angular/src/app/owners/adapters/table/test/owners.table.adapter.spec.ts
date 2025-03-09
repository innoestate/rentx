import { Owner } from 'src/app/owners/models/owner.model';
import { UiTableRow } from 'src/app/ui/components/ui-table/models/ui-table-row.model';
import { OwnersTableAdapterService } from '../owners.table.adapter';
import { ownerMock1 } from './mocks/owners.mock';

describe('OwnersTableAdapter', () => {
  let adapter: OwnersTableAdapterService;

  beforeEach(() => {
    adapter = new OwnersTableAdapterService({} as any);
  });

  it('should return modified fields', () => {
    const owners: Owner[] = [ownerMock1];
    const row = adapter.formatUiTableRow(owners[0]);
    row.cells['zip'] = '54321';
    row.cells['phone'] = '098-765-4321';
    const updates = adapter.buildUpdateFields(row, owners);
    expect(updates.id).toEqual(ownerMock1.id);
    expect(updates.zip).toEqual('54321');
    expect(updates.phone).toEqual('098-765-4321');
  });

  it('should throw an error if owner not found', () => {
    const owners: Owner[] = [];
    const row: UiTableRow = {
      data: { id: 99 },
      cells: {}
    };
    expect(() => adapter.buildUpdateFields(row, owners)).toThrowError('Owner not found');
  });
});
