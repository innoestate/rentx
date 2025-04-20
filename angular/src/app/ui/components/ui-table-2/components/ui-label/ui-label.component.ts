import { Component, computed, input } from '@angular/core';
import { UiTitle } from '../../models/ui-title.model';
import { UiIcon } from '../../models/ui-icon.model';
import { UiIconComponent } from '../../../ui-icon/ui-icon.component';

@Component({
  selector: 'ui-label',
  imports: [UiIconComponent],
  templateUrl: './ui-label.component.html',
  styleUrl: './ui-label.component.scss'
})
export class UiLabelComponent {

  title = input<UiTitle>();
  icon = input<UiIcon>();
  loading = input<boolean>(false);

  titleLabel = computed(() => {
    return this.title()?.label || '';
  });

  fontFamily = computed(() => {
    return this.title()?.weight === 'bold' ? 'primary-bold' : 'primary';
  });

  titleColor = computed(() => {
    if (this.loading()) {
      return 'var(--color-basic-500)';
    }
    return this.title()?.color || 'var(--color-primary-900)';
  });

  iconName = computed(() => {
    return this.icon()?.name || '';
  });

  iconColor = computed(() => {
    return this.icon()?.color || 'var(--color-primary-500)';
  });

  iconCommand = computed(() => {
    return this.icon()?.command;
  });
}
