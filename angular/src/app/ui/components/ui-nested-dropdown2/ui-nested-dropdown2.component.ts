import { Component, input, output, signal, ViewChild } from '@angular/core';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { UiNestedDropdown2 } from '../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model';

@Component({
  imports: [],
  templateUrl: './ui-nested-dropdown2.component.html',
  styleUrl: './ui-nested-dropdown2.component.scss'
})
export class UiNestedDropdown2Component {

  @ViewChild('dropdownMenu') dropdownRef!: NzDropdownMenuComponent;
  dropdown = input<UiNestedDropdown2>();
  triggerType = input<'click' | 'hover'>('click');
  onHide = output<void>();
  visible = signal(false);

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

}
