import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, forwardRef, input, output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzSelectComponent, NzSelectModule } from 'ng-zorro-antd/select';
import { UiDropdownItem } from './model/ui-dropdown-item.model';

@Component({
  selector: 'ui-dropdown',
  imports: [CommonModule, FormsModule, NzSelectModule, ReactiveFormsModule],
  templateUrl: './ui-dropdown.component.html',
  styleUrl: './ui-dropdown.component.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiDropdownComponent),
      multi: true
    }
  ],
})
export class UiDropdownComponent implements ControlValueAccessor, AfterViewInit{

  @ViewChild('nzSelect', { static: false }) nzSelect!: NzSelectComponent;
  onChange: any = () => { };
  onTouched = () => { };

  select = output<any>();

  placeHolder = input<string>('');
  list = input.required<UiDropdownItem<any>[]>();
  openAtInit = input<boolean>(false);
  nzFormControl = new FormControl();

  constructor() {
    this.nzFormControl.valueChanges.subscribe(value => {
      this.onChange(value);
      this.select.emit(value);
    });

    effect(() => {
      if(this.list()?.length && !this.nzFormControl.value){
        this.nzFormControl.setValue(this.list()[0].value);
      }
    })
  }

  ngAfterViewInit(): void {
    if(this.openAtInit()){
      setTimeout(() => {
        this.nzSelect.setOpenState(true);
      }, 0);
    }
  }

  clickOnItem(item: UiDropdownItem<any>) {
    if (item.command !== undefined) {
      item.command();
    } else {
      // this.selectItem(item);
    }
  }

  writeValue(value: any): void {
    const item = this.list().find(i => i.value === value);
    this.nzFormControl.setValue(item?.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
