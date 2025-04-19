import { Component, effect, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subject } from 'rxjs';
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
  ])

  rows$ = new BehaviorSubject<UiTable2Row[]>([
    {
      data: { id: '1234' },
      cells: {
        firstName: {
          title: { label: 'John' }
        },
        lastName: {
          title: { label: 'Doe' }
        },
        email: {
          title: { label: 'johnDoe@gmail.com' }
        }
      }
    },


    { data: { id: '2345' }, cells: { firstName: { title: { label: 'Rose' } }, lastName: { title: { label: 'Marie' } } } },
  ])

  table: UiTable2 = {
    columns: toSignal(this.columns$) as Signal<UiTable2Column[]>,
    rows: toSignal(this.rows$) as Signal<UiTable2Row[]>
  }

}
