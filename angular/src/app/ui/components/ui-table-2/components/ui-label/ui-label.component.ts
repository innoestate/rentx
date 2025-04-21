import { Component, computed, HostListener, input, output } from '@angular/core';
import { UiIcon2Component } from '../../../ui-icon/ui-icon2.component';
import { UiLabel2 } from './models/ui-label.model';

@Component({
  selector: 'ui-label-2',
  imports: [UiIcon2Component],
  templateUrl: './ui-label.component.html',
  styleUrl: './ui-label.component.scss'
})
export class UiLabel2Component {

  label = input.required<UiLabel2>();
  loading = input<boolean>(false);
  active = input<boolean>(false);
  onClick = output<void>();

  protected title = computed(() => this.label()?.title);
  protected icon = computed(() => this.label()?.icon?.name ? this.label().icon: undefined);
  protected command = computed(() => this.label()?.command);
  protected color = computed(() => this.label()?.color || 'transparent' + ' !important');

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
    return this.title()?.color || 'var(--color-primary-900)';
  });

  contentOpacity = computed(() => {
    return this.loading() ? 0.5 : 1;
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
