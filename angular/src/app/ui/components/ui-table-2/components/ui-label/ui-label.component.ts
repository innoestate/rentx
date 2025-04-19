import { Component, input } from '@angular/core';
import { UiLabel } from '../../models/ui-label.model';

@Component({
  selector: 'ui-label',
  imports: [],
  templateUrl: './ui-label.component.html',
  styleUrl: './ui-label.component.scss'
})
export class UiLabelComponent {

  label = input.required<UiLabel>();

  getFontFamily(){
    return this.label()?.title?.weight === 'bold' ? 'primary-bold' : 'primary';
  }

}
