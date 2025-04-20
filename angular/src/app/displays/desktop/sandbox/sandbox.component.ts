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
    { key: 'firstName', label: { title: { label: 'Nom' } }, type: 'text' },
    { key: 'lastName', label: { title: { label: 'Prénom' } }, type: 'text' },
    { key: 'email', label: { title: { label: 'Email' } }, type: 'text' },
    { key: 'actions', label: { icon:  { name: 'add' } }, type: 'text' }
  ])

  rows$ = new BehaviorSubject<UiTable2Row[]>([
    {
      data: { id: '1234' },
      cells: {
        firstName: {
          title: {
            label: 'John',
            color: 'var(--color-tertiary-100)'
          },
          icon: {
            name: 'add',
            color: 'var(--color-basic-100)'
          },
          color: 'var(--color-tertiary-500)'
        },
        lastName: {
          title: { label: 'Doe' }
        },
        email: {
          title: { label: 'johnDoe@gmail.com' }
        }
      }
    },
    {
      data: { id: '2345' }, cells: {
        firstName: {
          icon: {
            name: 'lodger'
          },
          title: {
            label: 'Rose de la précigout en élevage sur terre et en aquaculture'
          }
        },
        lastName: {
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
