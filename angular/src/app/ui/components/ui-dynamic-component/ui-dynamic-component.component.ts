import { AfterViewInit, Component, ComponentRef, ElementRef, EventEmitter, Injector, model, ViewContainerRef } from '@angular/core';
import { delay, filter, map, of, switchMap, tap } from 'rxjs';
import { DynamicComponentFactoryService } from '../../services/factory/dynamic-component-factory.service';
import { UiDisplayerComponent } from '../ui-displayer/ui-displayer.component';

@Component({
  selector: 'ui-dynamic-component',
  standalone: true,
  styles: ``,
  template: '',
})
export class UiDynamicComponentComponent implements AfterViewInit {

  component = model.required<{ name: string, replace: EventEmitter<{ name: string, appearsDelay: true }> }>();
  ref!: ComponentRef<UiDisplayerComponent> | null;
  ANIMATION_DELAY = 1000;
  SCALE_START = 0.95;

  constructor(private factory: DynamicComponentFactoryService,
    private viewContainerRef: ViewContainerRef,
    private elRef: ElementRef,
    private injector: Injector) { }

  ngAfterViewInit(): void {


    this.component().replace.pipe(
      tap(replacer => console.log('replace', this.component().name, '->', replacer.name)),
      filter(replacer => this.canReplace(replacer.name)),
      switchMap(replacer => {
        if (this.ref) {
          return this.ref!.instance.desapears().pipe(
            tap(() => {
              this.elRef.nativeElement.parentElement?.removeChild(this.ref?.location?.nativeElement);
              this.ref?.destroy();
              this.component().name = '';
              this.ref = null;
            }),
            map(() => replacer)
          )
        }
        return of(replacer)
      }),
      tap(replacer => {
        if (replacer.name !== '') {
          this.buildComponent(replacer);
        }
      })
    ).subscribe();
  }

  private buildComponent(replacer: { name: string, appearsDelay: true }): Promise<string> {
    return new Promise((resolve) => {

      const factoryComponentData = this.factory.getComponent(replacer.name);

      this.ref = this.viewContainerRef.createComponent(factoryComponentData.component, { injector: this.injector });
      if (factoryComponentData.values) {
        Object.keys(factoryComponentData.values).forEach(key => {
          (this.ref as ComponentRef<any>).instance[key] = (factoryComponentData.values as any)[key];
        });
      }

      this.component().name = replacer.name;
      (this.ref as ComponentRef<UiDisplayerComponent>).instance.appears().subscribe();

    });
  }

  private canReplace(nameOfNextComponent: string) {
    return (!!this.component().name || this.component().name === '') && (!!nameOfNextComponent || nameOfNextComponent === '') && (nameOfNextComponent !== this.component().name || nameOfNextComponent === '' || this.component().name === '');
  }

}
