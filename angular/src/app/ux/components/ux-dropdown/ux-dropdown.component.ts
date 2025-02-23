import { CommonModule } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
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
export class UxDropdownComponent<T> implements ControlValueAccessor {

  onChange: any = () => { };
  onTouched = () => { };

  placeHolder = input<string>('');
  list = input.required<UxDropdownItem<T>[]>();
  nzFormControl = new FormControl();

  constructor() {
    this.nzFormControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
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
