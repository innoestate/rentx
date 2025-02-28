import { AfterViewInit, Component, effect, ElementRef, input, output, signal, ViewChild } from '@angular/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UxDropdownItem } from '../../ux-dropdown/model/ux-dropdown-item.model';

@Component({
  selector: 'ux-nested-dropdown',
  imports: [NzDropDownModule],
  standalone: true,
  templateUrl: './ux-nested-dropdown.component.html',
  styleUrl: './ux-nested-dropdown.component.scss',
})
export class UxNestedDropdownComponent implements AfterViewInit {

  @ViewChild('nzTrigger', { static: false }) nzTrigger!: ElementRef;
  @ViewChild('menu', { static: false }) menu!: NzDropdownMenuComponent;
  triggerType = input<'click' | 'hover'>('click');
  value = input<UxDropdownItem<any> | any>();
  list = input.required<UxDropdownItem<any>[]>();
  insideValue = signal<UxDropdownItem<any> | null>(null);
  onSelect = output<UxDropdownItem<any>>();
  openAtInit = input<boolean>(false);

  protected displayedLabel!: string;

  constructor() {
    this.fitInsideValueFromValue();
    this.fitDisplayedLabelFromInsideValue();
  }


  ngAfterViewInit(): void {
    if (this.openAtInit()) {
      this.nzTrigger.nativeElement.click();
    }
  }

  isDropdown(item: UxDropdownItem<any>): boolean {
    return item.target instanceof Array;
  }

  clickOnItem(item: UxDropdownItem<any>) {
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
      this.displayedLabel = this.insideValue()?.label ?? '';
    })
  }

  private selectItem(item: UxDropdownItem<any>) {
    this.insideValue.set(item);
    this.onSelect.emit(item);
  }

}
