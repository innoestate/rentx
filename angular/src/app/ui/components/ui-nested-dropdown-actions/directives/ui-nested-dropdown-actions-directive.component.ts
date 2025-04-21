// custom-dropdown.directive.ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[nestedDropdown]',
})
export class UiCustomNestedActionsDropdownDirective {
  @Input() preventClose = false;

  constructor(private el: ElementRef) {}

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    console.log('mouseleave intercepted');
    event.stopPropagation(); // Prevent the default mouseleave from closing the dropdown
  }
}