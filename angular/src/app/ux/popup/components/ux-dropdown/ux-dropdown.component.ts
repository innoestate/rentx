import { Component, effect, forwardRef, input, model } from '@angular/core';
import { UxDropdownItem } from './model/ux-dropdown-item.model';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'ux-dropdown',
  standalone: true,
  imports: [NzSelectModule, ReactiveFormsModule],
  templateUrl: './ux-dropdown.component.html',
  styleUrl: './ux-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UxDropdownComponent),
      multi: true
    }
  ]
})
export class UxDropdownComponent implements ControlValueAccessor {

  onChange = (_: any) => {};
  onTouched = () => {};

  selectedItem = model<any>();
  placeHolder = input<string>('');
  list = input.required<UxDropdownItem[]>();

  formControl = new FormControl(null);

  constructor() {

    effect(() => {

      // this.list().

    });


   }

  writeValue(obj: any): void {
    console.log('writeValue', obj);
    console.log('list', this.list());

    const item = this.list().find(i => i.target === obj);

    this.formControl.setValue(item?.target);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
