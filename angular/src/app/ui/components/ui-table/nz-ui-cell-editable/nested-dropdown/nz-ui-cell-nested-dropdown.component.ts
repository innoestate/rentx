import { AfterViewInit, Component, computed, ElementRef, HostListener, input, signal } from '@angular/core';
import { isEqual } from 'lodash';
import { UiDropdownItem } from '../../../ui-dropdown/model/ui-dropdown-item.model';
import { UiIconComponent } from '../../../ui-icon/ui-icon.component';
import { UiLabelComponent } from '../../../ui-label/ui-label.component';
import { UiNestedDropdownComponent } from '../../../ui-nested-dropdown/ui-nested-dropdown.component';
import { UiTableColumnItem } from '../../models/ui-table.column.model';
import { NzUxCellItemComponent } from '../../nz-ui-cell-item/nz-ui-cell-item.component';
import { NzUxCellEditableComponent } from '../nz-ui-cell-editable.directive';

@Component({
  selector: 'nz-ui-cell-nested-dropdown',
  imports: [UiNestedDropdownComponent, NzUxCellItemComponent, UiLabelComponent, UiIconComponent],
  standalone: true,
  templateUrl: './nz-ui-cell-nested-dropdown.component.html',
  styleUrl: './nz-ui-cell-nested-dropdown.component.scss'
})
export class NzUiCellNestedDropdownComponent extends NzUxCellEditableComponent implements AfterViewInit {

  protected override insideValue = signal<any>(undefined!);
  protected displayedValue = this.getDisplayedValue();
  column = input.required<UiTableColumnItem>();
  list = computed(() => this.column().dropdown?.list ?? []);
  dropDownCellsUniqueItem = computed(() => this.column().dropDownCellsUniqueItem);
  nzTableList = computed(() => this.addRowArgumentInCommands(this.list()));
  isEmpty = this.checkIfValueIsEmpty();

  constructor(private elRef: ElementRef) {
    super();
  }

  @HostListener('click')
  onClick() {
    if(!this.isOnEditMode()){
      this.startToEdit();
    }
  }

  editNestedDropdown(value: UiDropdownItem<any>) {
    this.edit.emit(value);
    this.insideValue.set(this.list().find(item => isEqual(value, item)));
    this.isOnEditMode.set(false);
  }

  closeDropdown() {
    this.isOnEditMode.set(false);
  }

  ngAfterViewInit(): void {
    this.applyColor();
  }

  private getDisplayedValue(){
    return computed(() => {
      let value = {...this.insideValue()!};
      value = this.adaptTextColorifCellIsColored(value);
      value.iconSize = 14;
      return value;
    })
  }

  private adaptTextColorifCellIsColored(value: any){
    if(value?.color){
      value.color = 'var(--color-basic-100)';
    }
    return value;
  }

  private applyColor(){
    if (this.insideValue()?.color) {
      this.elRef.nativeElement.classList.add('colored');
      this.elRef.nativeElement.style.setProperty('background-color', this.insideValue()?.color, 'important');
    }
  }

  private checkIfValueIsEmpty() {
    return computed(() => {
      return (!this.insideValue()?.value || this.insideValue()?.value === '')
        && !this.column().dropDownCellsUniqueItem;
    })
  }

  private addRowArgumentInCommands(items: UiDropdownItem<any>[]): UiDropdownItem<any>[] {
    return items.map(item_ => {
      const item = item_ as any;
      if (item.value instanceof Array) {
        return { label: item.label, value: this.addRowArgumentInCommands(item.value) };
      } else if (item.command !== undefined) {
        return {
          ...item, command: () => {
            item.command(this.row());
            return true;
          }
        };
      } else {
        return { ...item };
      }
    })
  }

}

