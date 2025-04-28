import { Component, computed, ElementRef, input, output, ViewChild } from '@angular/core';
import { UiLabel } from '../ui-label/models/ui-label.model';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'ui-input',
  imports: [UiIconComponent],
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss'
})
export class UiInputComponent {

  @ViewChild('inputRef') inputRef!: ElementRef;
  label = input.required<UiLabel>();
  type = input<string>('text');
  onEdit = output<void>();

  protected title = computed(() => this.label()?.title);
  protected icon = computed(() => this.label()?.icon?.name ? this.label().icon: undefined);
  protected command = computed(() => this.label()?.command);
  protected color = computed(() => this.label()?.color || 'transparent' + ' !important');

  protected backgroundColor = computed(() => {
    return (this.color() || 'transparent') + ' !important';
  });

  protected edit = () => {
    this.onEdit.emit(this.getInput().value);
  };

  titleLabel = computed(() => {
    return this.title()?.label || '';
  });

  fontFamily = computed(() => {
    return this.title()?.weight === 'bold' ? 'primary-bold' : 'primary';
  });

  titleColor = computed(() => {
    return this.title()?.color || 'var(--color-primary-900)';
  });

  getInput(){
    return this.inputRef.nativeElement;
  }
}
