import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { UiCell } from 'src/app/ui/components/ui-table-2/models/ui-cell.model';
import { UiTable2Row } from 'src/app/ui/components/ui-table-2/models/ui-table-row.model';
import { UiTable2Column } from 'src/app/ui/components/ui-table-2/models/ui-table.column.model';
import { UiTable2 } from 'src/app/ui/components/ui-table-2/models/ui-table.model';

@Component({
  selector: 'app-sandbox',
  standalone: false,
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.scss'
})
export class SandboxComponent {

  columns$ = new BehaviorSubject<UiTable2Column[]>([
    { key: 'firstName', cell: { type: 'string', title: { label: 'Nom' } }, },
    { key: 'lastName', cell: { type: 'string', title: { label: 'Prénom' } }, },
    { key: 'email', cell: { type: 'string', title: { label: 'Email' } }, },
    { key: 'actions', cell: { type: 'icon', icon:  { name: 'add' } }, }
  ])

  rows$ = new BehaviorSubject<UiTable2Row[]>([
    {
      data: { id: '1234' },
      cells: {
        firstName: {
          type: 'string',
          title: {
            label: 'John',
            color: 'var(--color-tertiary-100)'
          },
          icon: {
            name: 'add',
            color: 'var(--color-basic-100)'
          },
          color: 'var(--color-tertiary-500)',
          editable: true
        },
        lastName: {
          type: 'string',
          title: { label: 'Doe' },
          editable: true
        },
        email: {
          type: 'string',
          title: { label: 'johnDoe@gmail.com' }
        }
      }
    },
    {
      data: { id: '2345' }, cells: {
        firstName: {
          type: 'string',
          icon: {
            name: 'lodger'
          },
          title: {
            label: 'Rose de la précigout en élevage sur terre et en aquaculture'
          }
        },
        lastName: {
          type: 'string',
          title: {
            label: 'Marie'
          }
        }
      }
    },
  ])

  table: UiTable2 = {
    columns: toSignal(this.columns$) as Signal<UiTable2Column[]>,
    rows: toSignal(this.rows$) as Signal<UiTable2Row[]>
  }

  editCell(event: { id: string, key: string, cell: UiCell }) {
    //fake call to server
    setTimeout(() => {
      this.rows$.next(this.rows$.getValue().map(row => {
        if (row.data.id === event.id) {
          return {
            ...row,
            cells: {
              ...row.cells,
              [event.key]: {
                ...row.cells[event.key],
                title: {
                  ...row.cells[event.key].title,
                  label: event.cell!.title!.label
                }
              }
            }
          }
        }
        return row;
      }));
    }, 2500);
  }

}
