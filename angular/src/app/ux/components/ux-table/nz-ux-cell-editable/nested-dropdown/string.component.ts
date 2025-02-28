import { Component, input } from '@angular/core';
import { UxDropdownItem } from '../../../ux-dropdown/model/ux-dropdown-item.model';
import { UxNestedDropdownComponent } from '../../ux-nested-dropdown/ux-nested-dropdown.component';
import { NzUxCellEditableComponent } from '../nz-ux-cell-editable.component';

@Component({
  selector: 'nz-ux-cell-nested-dropdown',
  imports: [UxNestedDropdownComponent],
  standalone: true,
  templateUrl: './string.component.html',
  styleUrl: './string.component.scss'
})
export class NzUxCellNestedDropdownComponent extends NzUxCellEditableComponent {

  protected override insideValue!:any;
  list = input.required<UxDropdownItem<string>[]>();

}

