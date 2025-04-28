import { Component, computed, input, output, signal, ViewChild } from '@angular/core';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { UiNestedDropdown } from '../ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model';

@Component({
  imports: [],
  templateUrl: './ui-nested-dropdown.component.html',
  styleUrl: './ui-nested-dropdown.component.scss'
})
export class UiNestedDropdownComponent {

  @ViewChild('dropdownMenu') dropdownRef!: NzDropdownMenuComponent;
  dropdown = input<UiNestedDropdown>();
  formatedDropdown = this.formatDropdown();
  triggerType = input<'click' | 'hover'>('click');
  onHide = output<void>();
  visible = signal(false);

  visibleChangeHandler(visible_: boolean) {
    this.visible.set(visible_);
    if (!visible_) {
      this.hide();
    }
  }

  hide() {
    this.onHide.emit();
    if (this.triggerType() === 'click') {
      this.visible.set(false);
    } else {
      this.dropdownRef.setMouseState(false);
    }
  }

  protected formatDropdown() {
    return computed(() => {
      const dropdown = this.dropdown();
      if (dropdown?.labelMatrix) {
        if (dropdown?.labelMatrix?.title === false && dropdown?.label?.title) {
          dropdown.label.title = undefined;
        }
        if (dropdown?.labelMatrix?.icon === false && dropdown?.label?.icon) {
          dropdown.label.icon = undefined;
        }
      }
      return dropdown;
    });
  }

}
