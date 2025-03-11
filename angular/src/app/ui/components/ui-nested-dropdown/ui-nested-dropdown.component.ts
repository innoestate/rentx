import { AfterViewInit, Component, effect, ElementRef, input, output, signal, ViewChild } from '@angular/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UiDropdownItem } from '../ui-dropdown/model/ui-dropdown-item.model';
import { UiItem } from '../../models/ui-item.model';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ToolFill } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'ui-nested-dropdown',
  imports: [NzDropDownModule, CommonModule, NzIconModule],
  standalone: true,
  templateUrl: './ui-nested-dropdown.component.html',
  styleUrl: './ui-nested-dropdown.component.scss',
})
export class UiNestedDropdownComponent implements AfterViewInit {

  @ViewChild('nzTrigger', { static: false }) nzTrigger!: ElementRef;
  @ViewChild('menu', { static: false }) menu!: NzDropdownMenuComponent;
  triggerType = input<'click' | 'hover'>('click');
  value = input<UiDropdownItem<any> | any>();
  list = input.required<UiDropdownItem<any>[]>();
  insideValue = signal<UiDropdownItem<any> | null>(null);
  onSelect = output<UiDropdownItem<any>>();
  openAtInit = input<boolean>(false);

  protected displayedValue!: UiDropdownItem<any>;

  constructor() {
    this.fitInsideValueFromValue();
    this.fitDisplayedLabelFromInsideValue();
  }


  ngAfterViewInit(): void {
    if (this.openAtInit()) {
      this.nzTrigger.nativeElement.click();
    }
  }

  isDropdown(item: UiDropdownItem<any>): boolean {
    return item.value instanceof Array;
  }

  clickOnItem(item: UiDropdownItem<any>) {
    if (item.command !== undefined) {
      item.command();
    } else {
      this.selectItem(item);
    }
  }

  private fitInsideValueFromValue() {
    effect(() => {
      this.insideValue.set(this.value() ?? null);
    })
  }

  private fitDisplayedLabelFromInsideValue() {
    effect(() => {
      this.displayedValue = this.insideValue()!;
    })
  }

  private selectItem(item: UiDropdownItem<any>) {
    this.insideValue.set(item);
    this.onSelect.emit(item);
  }

}
