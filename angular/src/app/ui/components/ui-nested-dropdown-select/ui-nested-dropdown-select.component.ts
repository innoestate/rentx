import { CommonModule } from '@angular/common';
import { Component, input, output, signal, ViewChild } from '@angular/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UiNestedDropdownActions } from '../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model';
import { UiLabel2Component } from '../ui-table-2/components/ui-label/ui-label.component';

@Component({
  selector: 'ui-nested-dropdown-select',
  imports: [NzDropDownModule, CommonModule, UiLabel2Component],
  templateUrl: './ui-nested-dropdown-select.component.html',
  styleUrl: './ui-nested-dropdown-select.component.scss'
})
export class UiNestedDropdownSelectComponent {

  @ViewChild('dropdownMenu') dropdownRef!: NzDropdownMenuComponent;
  dropdown = input<UiNestedDropdownSelectComponent>();
  triggerType = input<'click' | 'hover'>('click');
  loading = input<boolean>(false);
  onHide = output<void>();
  onSelect = output<UiNestedDropdownActions>();
  visible = signal(false);

  constructor() {}

  visibleChangeHandler(visible_: boolean) {
    this.visible.set(visible_);
    if(!visible_){
      this.hide();
    }
  }

  hide() {
    this.onHide.emit();
    if(this.triggerType() === 'click'){
      this.visible.set(false);
    }else{
      this.dropdownRef.setMouseState(false);
    }
  }

  select(item: UiNestedDropdownActions){
    this.hide();
    this.onSelect.emit(item);
  }

}
