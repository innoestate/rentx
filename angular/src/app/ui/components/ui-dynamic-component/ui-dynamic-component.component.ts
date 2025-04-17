import { AfterViewInit, Component, ComponentRef, ElementRef, Injector, model, ViewContainerRef } from '@angular/core';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
import { DynamicComponentFactoryService } from '../../services/factory/dynamic-component-factory.service';
import { UiDisplayerComponent } from '../ui-displayer/ui-displayer.component';
import { UiDynamicComponent } from './models/ui-dynamic-component.model';

@Component({
  selector: 'ui-dynamic-component',
  standalone: true,
  styles: ``,
  template: '',
})
export class UiDynamicComponentComponent implements AfterViewInit {

  component = model.required<UiDynamicComponent>();
  ref!: ComponentRef<UiDisplayerComponent>;
  ANIMATION_DELAY = 1000;
  SCALE_START = 0.95;

  constructor(private factory: DynamicComponentFactoryService,
    private viewContainerRef: ViewContainerRef,
    private elRef: ElementRef,
    private injector: Injector) { }

  ngAfterViewInit(): void {
    this.component().replace.pipe(
      switchMap(name => this.displayComponent(name))
    ).subscribe();
  }

  private displayComponent(name: string): Observable<null> {
    return of(null).pipe(
      filter(() => this.canReplace(name)),
      switchMap(() => this.removePreviousComponent()),
      filter(() => name !== ''),
      tap(() => this.buildComponent(name))
    );
  }

  private removePreviousComponent(): Observable<null> {
    if (this.component().name && this.component().name !== '') {
      return this.ref!.instance.desapears().pipe(
        tap(() => {
          this.elRef.nativeElement.parentElement?.removeChild(this.ref?.location?.nativeElement);
          this.ref?.destroy();
          this.component().name = '';
        }),
      )
    }
    return of(null)
  }

  private buildComponent(name: string): void {
    this.createComponent(name);
    this.component().name = name;
    this.ref.instance.appears().subscribe();
  }

  private createComponent(name: string): void {
    const factoryComponentData = this.factory.getComponent(name);
    this.ref = this.viewContainerRef.createComponent(factoryComponentData.component, { injector: this.injector });
    if (factoryComponentData.values) {
      Object.keys(factoryComponentData.values).forEach(key => {
        (this.ref as ComponentRef<any>).instance[key] = (factoryComponentData.values as any)[key];
      });
    }
  }

  private canReplace(nameOfNextComponent: string) {
    return (!!this.component().name || this.component().name === '') && (!!nameOfNextComponent || nameOfNextComponent === '') && (nameOfNextComponent !== this.component().name || nameOfNextComponent === '' || this.component().name === '');
  }

}
