// icon.component.ts
import { Component, ElementRef, Inject, input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICON_REGISTRY, IconDefinition } from './registery/ui-icon.registery';

@Component({
  selector: 'ui-icon',
  template: '',
  standalone: true,
  imports: [],
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class UiIconComponent implements OnInit {
  icon = input.required<string>();
  color = input<string>('var(--color-secondary-500)');
  size = input<number>(16);

  svgContent: SafeHtml = '';

  constructor(
    private sanitizer: DomSanitizer,
    private elRef: ElementRef,
    @Inject(ICON_REGISTRY) private iconRegistry: IconDefinition[]
  ) {}

  ngOnInit() {
    this.renderIcon();
  }

  private renderIcon() {
    let svg = this.getSvg();
    svg = this.setColor(svg);
    svg = this.setSize(svg);
    this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
    this.elRef.nativeElement.innerHTML = svg;
  }

  private getSvg(): string{
    const iconDef = this.iconRegistry.find(i => i.name === this.icon());
    if (!iconDef) {
      console.warn(`Icon '${this.icon()}' not found in registry`);
      return '';
    }
    return iconDef.svg;
  }

  private setColor(svg: string){
    if (this.color()) {
      if (svg.includes('fill=')) {
        svg = svg.replace(/fill="[^"]*"/g, `fill="${this.color()}"`);
      }
      else if (svg.includes('<path')) {
        svg = svg.replace(/<path/g, `<path fill="${this.color()}"`);
      }
      else {
        svg = svg.replace(/<svg/, `<svg fill="${this.color()}"`);
      }
    }
    return svg;
  }

  private setSize(svg: string){
    const size = this.size() || '1em';
    svg = svg.replace(/<svg/, `<svg width="${size}" height="${size}"`);
    return svg;
  }
}