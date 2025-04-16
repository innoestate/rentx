import { Component, ComponentRef, ElementRef, EventEmitter, model, ViewContainerRef } from '@angular/core';
import { delay, filter, of, switchMap, tap } from 'rxjs';
import { DynamicComponentFactoryService } from '../../services/factory/dynamic-component-factory.service';

@Component({
  selector: 'ui-dynamic-component',
  standalone: true,
  template: '',
})
export class UiDynamicComponentComponent {

  component = model.required<{ name: string, replace: EventEmitter<string> }>();
  previousRef!: ComponentRef<any> | null;
  nextRef!: ComponentRef<any> | null;
  ANIMATION_DELAY = 2500;
  SCALE_START = 0.95;
  previousSize: { width: number, height: number } | null = null;
  nextSize: { width: number, height: number } | null = null;

  indexIterator = 0;
  nextRefIndex = 0;

  constructor(private factory: DynamicComponentFactoryService, private viewContainerRef: ViewContainerRef, private elRef: ElementRef) { }

  ngOnInit(): void {

    this.previousRef = this.buildComponent(this.component().name, 0);
    // this.initInAnimation();
    // setTimeout(() => {
    //   this.startInAnimation();
    //   setTimeout(() => {
    //     this.endInAnimation();
    //   }, 100)
    // }, 0);

    this.elRef.nativeElement.style.transition = `width ${this.ANIMATION_DELAY}ms`;

    this.component().replace.pipe(
      filter(nameOfNewComponent => this.canReplace(nameOfNewComponent)),
      tap(nameOfNewComponent => {
        console.log('replace', this.component().name, '=>', nameOfNewComponent);
      }),
      switchMap(nameOfNewComponent => this.createNextComponent(nameOfNewComponent)),
      switchMap(nameOfNewComponent => this.exitPreviousComponent(nameOfNewComponent)),
      switchMap(nameOfNewComponent => this.enterNextComponent(nameOfNewComponent))
    ).subscribe();
  }

  private createNextComponent(nextComponentName: string) {
    return of(nextComponentName).pipe(
      tap(nextComponentName => {
        if (nextComponentName !== '') {
          this.nextRefIndex = this.indexIterator;
          let index = this.component().name === '' ? 0 : 1;
          this.nextRef = this.buildComponent(nextComponentName, index);
          this.nextRef!.location.nativeElement.style.opacity = '0';
          this.nextRef!.location.nativeElement.style.position = 'absolute';
          this.nextRef!.location.nativeElement.style.transition = 'none';
        } else {
          this.nextRef = null;
        }
      }),
      delay(0),
      tap(() => {
        if (this.nextRef) {
          this.nextSize = { width: this.nextRef!.location.nativeElement.offsetWidth, height: this.nextRef!.location.nativeElement.offsetHeight };
          let index = this.component().name === '' ? 0 : 1;
          this.viewContainerRef.remove(index);
        } else {
          this.nextSize = { width: 0, height: 0 };
        }
      })
    )
  }

  private exitPreviousComponent(nameOfNewComponent: string) {
    return of(nameOfNewComponent).pipe(
      switchMap(nameOfNewComponent => {
        if (this.component().name && this.component().name !== '') {
          return of(nameOfNewComponent).pipe(
            tap(() => {
              let previousRefWidth = this.previousRef!.location.nativeElement.offsetWidth;
              let previousRefHeight = this.previousRef!.location.nativeElement.offsetHeight;
              this.previousSize = { width: previousRefWidth, height: previousRefHeight };
              this.previousRef!.location.nativeElement.style.transition = `none`;
              this.previousRef!.location.nativeElement.style.width = previousRefWidth + 'px';
              this.previousRef!.location.nativeElement.style.height = previousRefHeight + 'px';
              console.log(this.component().name, 'previus ref', this.previousRef!.location.nativeElement.offsetWidth, this.previousRef, this.previousSize);

            }),
            delay(10),
            tap(() => {
              this.previousRef!.location.nativeElement.style.transition = `all ${this.ANIMATION_DELAY}ms`;
              this.previousRef!.location.nativeElement.style.width = this.nextSize?.width + 'px';
              this.previousRef!.location.nativeElement.style.height = this.nextSize?.height + 'px';
            }),
            delay(this.ANIMATION_DELAY),
            tap(() => {
              this.viewContainerRef.clear();
            })
          )
        } else {
          return of(nameOfNewComponent).pipe(
            tap(() => {
              this.previousSize = { width: 0, height: 0 };
            })
          )
        }
      })
    )
  }

  private enterNextComponent(nameOfNewComponent: string) {
    return of(nameOfNewComponent).pipe(
      switchMap(nameOfNewComponent => {
        if (nameOfNewComponent && nameOfNewComponent !== '') {
          return of(nameOfNewComponent).pipe(
            tap(() => {
              this.nextRef = this.buildComponent(nameOfNewComponent, 0);
              this.component().name = nameOfNewComponent;
              this.nextRef!.location.nativeElement.style.transition = `none`;
              this.nextRef!.location.nativeElement.style.position = 'relative';
              this.nextRef!.location.nativeElement.style.opacity = '1';
              console.log(nameOfNewComponent, 'size', this.previousSize);
              this.nextRef!.location.nativeElement.style.width = `${this.previousSize?.width}px`;
              this.nextRef!.location.nativeElement.style.height = `${this.previousSize?.height}px`;
              this.previousRef = this.nextRef;
            }),
            delay(10),
            tap(() => {
              this.nextRef!.location.nativeElement.style.transition = `all ${this.ANIMATION_DELAY}ms`;
              this.nextRef!.location.nativeElement.style.width = `${this.nextSize?.width}px`;
              this.nextRef!.location.nativeElement.style.height = `${this.nextSize?.height}px`;
            })
          )
        } else {
          return of(nameOfNewComponent).pipe(
            tap(nameOfNewComponent => this.component().name = nameOfNewComponent)
          )
        }
      })
    );
  }


  private buildComponent(name: string, index: number) {
    const factoryComponentData = this.factory.getComponent(name);
    const ref = this.viewContainerRef.createComponent(factoryComponentData.component, {index});
    if (factoryComponentData.values) {
      Object.keys(factoryComponentData.values).forEach(key => {
        (ref as ComponentRef<any>).instance[key] = (factoryComponentData.values as any)[key];
      });
    }
    ref.location.nativeElement.style.transition = `width ${this.ANIMATION_DELAY}ms,
                                                  height ${this.ANIMATION_DELAY}ms,`;
    this.indexIterator++;
    return ref;
  }

  private canReplace(nameOfNextComponent: string) {
    return (!!this.component().name || this.component().name === '') && (!!nameOfNextComponent || nameOfNextComponent === '') && (nameOfNextComponent !== this.component().name || nameOfNextComponent === '' || this.component().name === '');
  }

}
