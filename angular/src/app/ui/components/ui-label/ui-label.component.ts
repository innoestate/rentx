import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ui-label',
  imports: [CommonModule, NzIconModule],
  templateUrl: './ui-label.component.html',
  styleUrl: './ui-label.component.scss'
})
export class UiLabelComponent {

  value = input.required<{ icon?: string, label?: string, color?: string }>();
  iconWithText = computed(() => !!(this.value()?.icon && (this.value()?.label?.length ?? 0) > 0));
  iconIsLonely = computed(() => !!(this.value()?.icon && !(this.value()?.label?.length ?? 0)));
  color = computed(() => this.value()?.color ?? 'var(--color-secondary-500)');

}
