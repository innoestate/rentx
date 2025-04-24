import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { cloneDeep } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { UiCell } from 'src/app/ui/components/ui-table/models/ui-cell.model';
import { UiTable2Row } from 'src/app/ui/components/ui-table/models/ui-table-row.model';
import { UiTableColumn } from 'src/app/ui/components/ui-table/models/ui-table.column.model';
import { UiTable2 } from 'src/app/ui/components/ui-table/models/ui-table.model';

@Component({
  selector: 'app-sandbox',
  standalone: false,
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.scss'
})
export class SandboxComponent {

  columns$ = new BehaviorSubject<UiTableColumn[]>([
    { key: 'address', cell: { type: 'fullSizeString', label: { title: { label: 'Adresse' } } } },
    {key: 'icon', cell: { type: 'icon', label: { icon: { name: 'add', command: () => alert('test') } } }},
    { key: 'commands', cell: { type: 'string', label: { title: { label: 'Actions' } } } },
    { key: 'zip', cell: { type: 'number', label: { title: { label: 'zip' } } }, },
    { key: 'firstName', cell: { type: 'mediumString', label: { title: { label: 'Nom' } } }, },
    { key: 'lastName', cell: { type: 'string', label: { title: { label: 'Prénom' } } }, },
    { key: 'email', cell: { type: 'mediumString', label: { title: { label: 'Email' } } }, },
    { key: 'phone', cell: { type: 'longNumber', label: { title: { label: 'Téléphone' } } }, },
    { key: 'action', cell: { type: 'dropdown-actions', dropdown: {
      label: { icon: { name: 'add', size: 24, color: 'var(--color-secondary-500)'} },
      list: [
        {
          label: {
            title: { label: 'Alerte' },
            icon: { name: 'add', size: 24, color: 'var(--color-tertiary-500)' },
            command: () => alert('test')
          }
        }
      ]
    } }, }
  ])

  rows$ = new BehaviorSubject<any[]>([
    {
      data: { id: '1234' },
      cells: {
        address: {
          type: 'string',
          label: {
            title: { label: '123 rue de la rue' },
          },
          editable: true
        },
        icon: {
          type: 'dropdown-actions',
          dropdown: {
            label: { icon: { name: 'add', size: 18, color: 'var(--color-tertiary-500)' } },
            list: [
              {
                label: {
                  title: { label: 'Alerte' },
                  icon: { name: 'add', size: 24, color: 'var(--color-tertiary-500)' },
                  command: () => alert('test')
                }
              }
            ]
          }
        },
        commands: {
          type: 'dropdown-actions',
          label: {
            title: { label: 'Actions' },
          },
          dropdown: { label: { color: 'var(--color-tertiary-500)', title: { label: 'Actions' }, icon: { name: 'down' }}, list: [
            {
              label: {
                color: 'var(--color-success-500)',
                title: { label: 'Alerte' },
                icon: { name: 'add', size: 24, color: 'var(--color-basic-100)' },
                command: () => alert('123')
              }
            },
            {
              label: {
                title: { label: 'Hello' },
                icon: { name: 'lodger', size: 24, color: 'var(--color-tertiary-500)' },
              },
              list : [
                {
                  label: {
                    title: { label: 'hi!' },
                    icon: { name: 'circle-user', size: 24, color: 'var(--color-tertiary-500)' },
                  },
                  list : [
                    {
                      label: {
                        title: { label: 'daaaa'}
                      },
                      list: [
                        {
                          label: {
                            title: { label: 'bonnn' }
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  label: {
                    title: { label: 'Hola!' },
                    icon: { name: 'circle-user', size: 24, color: 'var(--color-tertiary-500)' },
                    command: () => alert('Hola!')
                  }
                }
              ]
            }
          ] },
        },
        firstName: {
          type: 'string',
          label: {
            title: {
              label: 'John',
              color: 'var(--color-tertiary-100)'
            },
            icon: {
              name: 'add',
              color: 'var(--color-basic-100)'
            },
            color: 'var(--color-tertiary-500)',
          },
          editable: true
        },
        lastName: {
          type: 'dropdown-select',
          // editable: true,
          dropdown: {
            label: { title : { label: 'Dao'}},
            list: [
              {
                label: { title: { label: '& cie'}}
              },
              {
                label: { title: { label: '& co'}},
                list: [
                  { label: { title: { label: 'Jean'}}},
                  { label: { title: { label: 'Marie'}}}
                ]
              }
            ]
          }
        },
        email: {
          type: 'string',
          label: {
            title: { label: 'johnDoe@gmail.com' }
          }
        },
        phone: {
          type: 'number',
          label: {
            title: { label: 123456789 },
          },
          editable: true
        },
        zip: {
          type: 'number',
          label: {
            title: { label: 12345 },
          },
          editable: true
        },
        action: {
          type: 'icon',
          label: {
            icon: { name: 'down' },
          }
        }
      }
    },
    {
      data: { id: '2345' }, cells: {
        address: {
          type: 'string',
          editable: true
        },
        zip: {
          type: 'number',
          editable: true
        },
        phone: {
          type: 'number',
          editable: true
        },
        firstName: {
          type: 'string',
          label: {
            icon: {
              name: 'lodger'
            },
            title: {
              label: 'Rose de la précigout en élevage sur terre et en aquaculture'
            }
          }
        },
        lastName: {
          type: 'string',
          label: {
            title: {
              label: 'Marie'
            }
          }
        },
        action: {
          type: 'dropdown-actions',
          dropdown: {
            label: { icon: { name: 'down', size: 18, color: 'var(--color-tertiary-500)' } },
            list: [
              {
                label: {
                  title: { label: 'Alerte' },
                  icon: { name: 'add', size: 24, color: 'var(--color-tertiary-500)' },
                  command: () => alert('test')
                }
              }
            ]
          }
        }
      }
    },
  ])

  table: UiTable2 = {
    columns: toSignal(this.columns$) as Signal<UiTableColumn[]>,
    rows: toSignal(this.rows$) as Signal<UiTable2Row[]>
  }

  editCell(event: { id: string, key: string, cell: UiCell }) {
    //fake call to server
    setTimeout(() => {
      this.rows$.next(this.rows$.getValue().map(row => {
        if (row.data.id === event.id) {
          if(row.cells[event.key].dropdown) {
            const r = {
              ...row,
              cells: {
                ...row.cells,
                [event.key]: cloneDeep(event.cell)
              }
            };
            console.log('edit in sandbox', event.cell, r);
            return r;
          }else{

            const r = {
              ...row,
              cells: {
                ...row.cells,
                [event.key]: {
                  ...row.cells[event.key],
                  label: {
                    ...row.cells[event.key].label,
                    title: { ...row.cells[event.key].label?.title, label: (event.cell as any).label!.title!.label }
                  }
                }
              }
            };
            return r;
          }
        }
        return row;
      }));
    }, 2500);
  }

}
