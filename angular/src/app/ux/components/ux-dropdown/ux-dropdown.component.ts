import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, forwardRef, input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzSelectComponent, NzSelectModule } from 'ng-zorro-antd/select';
import { UxDropdownItem } from './model/ux-dropdown-item.model';

@Component({
  selector: 'ux-dropdown',
  imports: [CommonModule, FormsModule, NzSelectModule, ReactiveFormsModule],
  templateUrl: './ux-dropdown.component.html',
  styleUrl: './ux-dropdown.component.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UxDropdownComponent),
      multi: true
    }
  ],
})
export class UxDropdownComponent implements ControlValueAccessor, AfterViewInit{

  @ViewChild('nzSelect', { static: false }) nzSelect!: NzSelectComponent;
  onChange: any = () => { };
  onTouched = () => { };

  placeHolder = input<string>('');
  list = input.required<UxDropdownItem<any>[]>();
  openAtInit = input<boolean>(false);
  nzFormControl = new FormControl();

  constructor() {
    this.nzFormControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  ngAfterViewInit(): void {
    if(this.openAtInit()){
      setTimeout(() => {
        this.nzSelect.setOpenState(true);
      }, 0);
    }
  }

  writeValue(target: any): void {
    const item = this.list().find(i => i.target === target);
    this.nzFormControl.setValue(item?.target);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
