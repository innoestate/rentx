import { Component, effect, input, output, signal } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UxDropdownItem } from '../ux-dropdown/model/ux-dropdown-item.model';

@Component({
  selector: 'ux-nested-dropdown',
  imports: [NzDropDownModule],
  standalone: true,
  templateUrl: './ux-nested-dropdown.component.html',
  styleUrl: './ux-nested-dropdown.component.scss',
})
export class UxNestedDropdownComponent {

  triggerType = input<'click' | 'hover'>('click');
  value = input<UxDropdownItem<any> | any>();
  list = input.required<UxDropdownItem<any>[]>();
  insideValue = signal<UxDropdownItem<any> | null>(null);
  displayedLabel!: string;

  onSelect = output<UxDropdownItem<any>>();

  constructor() {
    this.fitInsideValueFromValue();
    this.fitDisplayedLabelFromInsideValue();
  }

  isDropdown(item: UxDropdownItem<any>): boolean {
    return item.target instanceof Array;
  }

  clickOnItem(item: UxDropdownItem<any>) {
    if(item.command !== undefined){
      item.command();
    }else{
      this.selectItem(item);
    }
  }

  private fitInsideValueFromValue() {
    effect(() => {
      this.insideValue.set(this.value()??null);
    })
  }

  private fitDisplayedLabelFromInsideValue() {
    effect(() => {
      this.displayedLabel = this.insideValue()?.label ?? '';
    })
  }

  private selectItem(item: UxDropdownItem<any>){
    this.insideValue.set(item);
    this.onSelect.emit(item);
  }

}
