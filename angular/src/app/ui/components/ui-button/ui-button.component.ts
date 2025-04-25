import { Component, computed, input, output, signal, Signal } from '@angular/core';
import { NzButtonModule, NzButtonType } from 'ng-zorro-antd/button';
import { UxButtonType } from './types/ui-button.type.type';
import { UiIcon } from '../ui-icon/models/ui-icon.model';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
    selector: 'ui-button',
    templateUrl: './ui-button.component.html',
    styleUrl: './ui-button.component.scss',
    standalone: true,
    imports: [NzButtonModule, UiIconComponent]
})
export class UiButtonComponent {

  text = input.required<string>();
  testSelector = input<string>();
  icon = input<UiIcon>();
  type = input<UxButtonType>('default');
  disabled = input<boolean>(false);
  click = output();

  nzType: Signal<NzButtonType> = computed(() => this.getButtonType());
  nzDanger = computed(() => this.type() === 'danger');

  onClick() {
    this.click.emit();
  }

  private getButtonType(): NzButtonType {
    if(this.isDanger()) {
      return 'default';
    }else if(this.hasAType()){
      return this.type() as NzButtonType;
    }else{
      return 'default';
    }
  }

  private isDanger(): boolean {
    if(this.type() === 'danger') {
      return true;
    }else{
      return false;
    }
  }

  private hasAType(): boolean {
    return !!this.type();
  }

}
