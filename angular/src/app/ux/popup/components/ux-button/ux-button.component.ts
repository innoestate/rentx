import { Component, input, output } from '@angular/core';

@Component({
  selector: 'ux-button',
  templateUrl: './ux-button.component.html',
  styleUrl: './ux-button.component.scss'
})
export class UxButtonComponent {

  click = output();
  text = input.required<string>();

}
