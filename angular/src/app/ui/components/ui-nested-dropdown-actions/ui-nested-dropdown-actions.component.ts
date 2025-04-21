import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, output, signal, ViewChild } from '@angular/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UiLabel2Component } from '../ui-table-2/components/ui-label/ui-label.component';
import { UiNestedDropdownActions } from './model/ui-nested-dropdown-actions.model';

@Component({
  selector: 'ui-nested-dropdown-actions',
  imports: [NzDropDownModule, CommonModule, UiLabel2Component],
  templateUrl: './ui-nested-dropdown-actions.component.html',
  styleUrl: './ui-nested-dropdown-actions.component.scss'
})
export class UiNestedDropdownActionsComponent {

  @ViewChild('dropdownMenu') dropdownRef!: NzDropdownMenuComponent;
  dropdown = input<UiNestedDropdownActions>();
  triggerType = input<'click' | 'hover'>('click');
  onHide = output<void>();
  visible = signal(false);

  constructor() {

  }

  visibleChangeHandler(visible_: boolean) {
    this.visible.set(visible_);
    if(!visible_){
      this.hide();
    }
  }

  hide() {
    console.log('hide!', this.triggerType());
    this.onHide.emit();
    if(this.triggerType() === 'click'){
      this.visible.set(false);
    }else{
      this.dropdownRef.setMouseState(false);
    }
  }

}
