import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, ElementRef, input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'ui-label',
  imports: [CommonModule, UiIconComponent, NzIconModule],
  templateUrl: './ui-label.component.html',
  styleUrl: './ui-label.component.scss'
})
export class UiLabelComponent implements AfterViewInit{

  value = input.required<{ icon?: string, label?: string, color?: string , iconSize?: number}>();
  iconWithText = computed(() => !!(this.value()?.icon && (this.value()?.label?.length ?? 0) > 0));
  iconIsLonely = computed(() => !!(this.value()?.icon && !(this.value()?.label?.length ?? 0)));
  color = computed(() => this.value()?.color ?? 'var(--color-secondary-500)');

  constructor(private elRef: ElementRef){

  }

  ngAfterViewInit(): void {
    if(this.value()?.icon && !this.hasText()){
      this.elRef.nativeElement.style.setProperty('justify-content', 'center');
    }
  }

  protected hasText(){
    return !!this.value()?.label && (this.value()?.label?.length ?? 0) > 0;
  }

}
