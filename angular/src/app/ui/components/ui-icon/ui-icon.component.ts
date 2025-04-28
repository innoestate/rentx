// icon.component.ts
import { AfterViewInit, Component, computed, effect, ElementRef, HostListener, input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, take, tap } from 'rxjs';
import { UiIconService } from './service/ui-icon.service';
import { UiIcon } from './models/ui-icon.model';

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
export class UiIconComponent implements OnInit, AfterViewInit {
  icon = input.required<UiIcon>();

  protected color = computed(() => this.icon().color);
  protected size = computed(() => this.icon().size);
  protected command = computed(() => this.icon().command);

  protected svgContent: SafeHtml = '';

  constructor(
    private sanitizer: DomSanitizer,
    private elRef: ElementRef,
    private iconService: UiIconService,
  ) {
    effect(() => {
      this.renderIcon();
    })
  }

  ngOnInit() {
    this.renderIcon();
  }

  ngAfterViewInit() {
    if(this.command()){
      this.elRef.nativeElement.style.cursor = 'pointer';
    }
  }

  @HostListener('click')
  onClick() {
    if(this.command()){
      this.command()!();
    }
  }

  private renderIcon() {
    this.getSvg().pipe(
      take(1),
      tap(svg => {
        svg = this.setColor(svg);
        svg = this.setSize(svg);
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
        this.elRef.nativeElement.innerHTML = svg;
      })
    ).subscribe();

  }

  private getSvg(): Observable<string> {
    return this.iconService.getIcon(this.icon().name);
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
