import { Component, computed, input } from '@angular/core';
import { UiTitle } from '../../models/ui-title.model';
import { UiIcon } from '../../models/ui-icon.model';
import { UiIcon2Component } from '../../../ui-icon/ui-icon2.component';

@Component({
  selector: 'ui-label',
  imports: [UiIcon2Component],
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
}
