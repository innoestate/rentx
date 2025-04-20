import { Component, computed, HostListener, input, output } from '@angular/core';
import { UiTitle } from '../../models/ui-title.model';
import { UiIcon } from '../../models/ui-icon.model';
import { UiIcon2Component } from '../../../ui-icon/ui-icon2.component';

@Component({
  selector: 'ui-label',
  imports: [UiIcon2Component],
  templateUrl: './ui-label.component.html',
  styleUrl: './ui-label.component.scss'
})
export class UiLabel2Component {

  title = input<UiTitle>();
  icon = input<UiIcon>();
  command = input<() => void>();
  color = input<string>();
  loading = input<boolean>(false);

  onClick = output<void>();

  protected backgroundColor = computed(() => {
    return (this.color() || 'transparent') + ' !important';
  });

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

  @HostListener('click')
  click() {
    if (this.command()) {
      this.command()!();
    }else{
      this.onClick.emit();
    }
  }
}
