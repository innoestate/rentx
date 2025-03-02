import { Component, effect, input } from '@angular/core';
import { UiDropdownItem } from '../../../ui-dropdown/model/ui-dropdown-item.model';
import { UiNestedDropdownComponent } from '../../../ui-nested-dropdown/ui-nested-dropdown.component';
import { NzUxCellEditableComponent } from '../nz-ui-cell-editable.component';

@Component({
  selector: 'nz-ui-cell-nested-dropdown',
  imports: [UiNestedDropdownComponent],
  standalone: true,
  templateUrl: './string.component.html',
  styleUrl: './string.component.scss'
})
export class NzUxCellNestedDropdownComponent extends NzUxCellEditableComponent {

  protected override insideValue!:any;
  list = input.required<UiDropdownItem<string>[]>();

  constructor(){
    super();
  }

}

