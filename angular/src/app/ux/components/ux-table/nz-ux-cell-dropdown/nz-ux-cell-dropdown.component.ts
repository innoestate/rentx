import { Component, computed, effect, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isEqual } from 'lodash';
import { UxDropdownItem } from '../../ux-dropdown/model/ux-dropdown-item.model';
import { UxDropdownComponent } from '../../ux-dropdown/ux-dropdown.component';
import { CellType } from '../types/ux-table.cell.type';

@Component({
  selector: 'nz-ux-cell-dropdown',
  imports: [UxDropdownComponent, FormsModule],
  standalone: true,
  templateUrl: './nz-ux-cell-dropdown.component.html',
  styleUrl: './nz-ux-cell-dropdown.component.scss'
})
export class NzUxCellDropdownComponent implements OnChanges {
  value = input.required<CellType>();
  list = input.required<UxDropdownItem<any>[]>();
  isOnEditMode = input.required<boolean>();
  isOnViewMode = computed(() => !this.isOnEditMode());
  startEdit = output<void>();
  stopEdit = output<void>();
  edit = output<string>();

  dropDownTarget!: any;
  visibleTarget!: any;

  ngOnChanges(): void {
    if (this.dropDownTarget) {
      this.dropDownTarget = this.list().find(item => isEqual(this.dropDownTarget, item.target))?.target
      this.makeEdit()
    }
  }

  constructor() {

    effect(() => {
      this.visibleTarget = this.value();
    })

    effect(() => {
      if (this.isOnEditMode()) {
        this.dropDownTarget = this.list().find(item => isEqual((this.visibleTarget??this.value() as UxDropdownItem<any>).target, item.target))?.target;
      } else if (this.dropDownTarget) {
        this.visibleTarget = this.list().find(item => isEqual(this.dropDownTarget, item.target));
      }
    })
  }

  startToEdit() {
    this.startEdit.emit();
  }

  makeEdit() {
    this.edit.emit(this.dropDownTarget);
  }

  endEdit() {
    this.stopEdit.emit();
  }

}
