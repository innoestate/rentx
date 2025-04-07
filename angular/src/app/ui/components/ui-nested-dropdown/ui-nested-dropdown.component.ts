import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, effect, ElementRef, HostListener, input, output, signal, ViewChild } from '@angular/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UiDropdownItem } from '../ui-dropdown/model/ui-dropdown-item.model';
import { isEqual } from 'lodash';

/**
 * This component is used to create a nested dropdown.
 * If the value input is one of the items list, it will me updated.
 * If the value is not in the item list it will be fixed value that will not change event if the list changes.
 */
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

  list = input.required<UiDropdownItem<any>[]>();
  value = input<UiDropdownItem<any> | any>();
  openAtInit = input<boolean>(false);
  triggerType = input<'click' | 'hover'>('click');
  fixedHeadValue = input<{
    label: string;
    icon: string;
    value: any;
    dropdown?: UiDropdownItem<any>[];
    command?: () => void;
    color?: string;
  }>();

  onSelect = output<UiDropdownItem<any>>();
  blur = output<void>();

  protected insideValue = signal<UiDropdownItem<any> | null>(null);
  protected displayedValue!: UiDropdownItem<any>;

  constructor(private elRef: ElementRef) {
    this.fitInsideValueFromValue();
    this.fitDisplayedLabelFromInsideValue();
  }

  @HostListener('click')
  onClick() {
    this.nzTrigger.nativeElement.click();
  }

  ngAfterViewInit(): void {
    this.centerValueIfGotOnlyIcon();
    if(this.insideValue()?.color){
      this.elRef.nativeElement.classList.add('colored');
    }
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

  onVisibleChange(visible: boolean) {
    if (!visible) {
      this.blur.emit();
    }
  }

  iconWithText(item: UiDropdownItem<any>): boolean {
    return !!(item.icon && item.label?.length > 0);
  }

  private centerValueIfGotOnlyIcon() {
    if (this.insideValue()?.icon && (!this.insideValue()?.label || this.insideValue()?.label === '')) {
      this.elRef.nativeElement.classList.add('center');
    }
  }

  private containValue(items: any[], value: any) {
    let contain = false;
    items.forEach(item => {
      if (Array.isArray(item.value as any)) {
        contain = this.containValue(item.value, value) ?? contain;
      } else {
        if (isEqual(item, value)) {
          contain = true;
        }
      }
    })
    return contain;
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
