import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'ui-label',
  imports: [CommonModule, UiIconComponent, NzIconModule],
  templateUrl: './ui-label.component.html',
  styleUrl: './ui-label.component.scss'
})
export class UiLabelComponent {

  value = input.required<{ icon?: string, label?: string, color?: string }>();
  size = input<number>(14);
  iconWithText = computed(() => !!(this.value()?.icon && (this.value()?.label?.length ?? 0) > 0));
  iconIsLonely = computed(() => !!(this.value()?.icon && !(this.value()?.label?.length ?? 0)));
  color = computed(() => this.value()?.color ?? 'var(--color-secondary-500)');

}
