import { Component, input, output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UxButtonType } from './types/ux-button.type.type';

@Component({
  selector: 'ux-button',
  templateUrl: './ux-button.component.html',
  styleUrl: './ux-button.component.scss',
  standalone: true,
  imports: [NzButtonModule],
})
export class UxButtonComponent {

  click = output();
  text = input.required<string>();
  cySelector = input<string>();
  type = input<UxButtonType>('default');

  onClick() {
    this.click.emit();
  }

}
