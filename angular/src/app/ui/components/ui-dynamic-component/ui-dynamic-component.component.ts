import { ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, model, ViewContainerRef } from '@angular/core';
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
  ANIMATION_DELAY = 1000;
  SCALE_START = 0.95;
  previousSize: { width: number, height: number } | null = null;
  nextSize: { width: number, height: number } | null = null;

  constructor(private factory: DynamicComponentFactoryService,
    private viewContainerRef: ViewContainerRef,
    private elRef: ElementRef,
    private injector: Injector,
    private appRef: ApplicationRef,
    private resolver: ComponentFactoryResolver) { }

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
      tap(nameOfNewComponent => console.log(this.component().name, '->', nameOfNewComponent)),
      switchMap(nameOfNewComponent => this.getNextComponentSize2(nameOfNewComponent)),
      switchMap(nameOfNewComponent => this.exitPreviousComponent(nameOfNewComponent)),
      switchMap(nameOfNewComponent => this.enterNextComponent(nameOfNewComponent))
    ).subscribe();
  }

  private getNextComponentSize2(nextComponentName: string) {
    let ref!: ComponentRef<any>;
    return of(nextComponentName).pipe(
      tap(nextComponentName => {
        if (nextComponentName !== '') {
          const factoryComponentData = this.factory.getComponent(nextComponentName);
          const factory = this.resolver.resolveComponentFactory(factoryComponentData.component);
          ref = factory.create(this.injector);
          if (factoryComponentData.values) {
            Object.keys(factoryComponentData.values).forEach(key => {
              (ref as ComponentRef<any>).instance[key] = (factoryComponentData.values as any)[key];
            });
          }
          this.appRef.attachView(ref.hostView);
          const element = (ref.hostView as any).rootNodes[0] as HTMLElement;
          this.nextSize = { width: element.offsetWidth, height: element.offsetHeight };
          const factoryLayout = document.getElementById('factory-layout');
          if (factoryLayout) {
            factoryLayout.appendChild(element);
          }
        }
      }),
      delay(0),
      tap(nameOfComponent => {
        if(ref){
          const element = (ref.hostView as any).rootNodes[0] as HTMLElement;
          this.nextSize = { width: element.offsetWidth, height: element.offsetHeight };
          const factoryLayout = document.getElementById('factory-layout');
          (factoryLayout as HTMLElement).removeChild(element);

          console.log(this.component().name, nameOfComponent, element, this.nextSize);


        }else{
          this.nextSize = { width: 0, height: 0 };
        }

      })
    )
  }

  private exitPreviousComponent(nameOfNewComponent: string) {
    return of(nameOfNewComponent).pipe(
      switchMap(nameOfNewComponent => {
        if (this.hasPreviousComponent()) {
          return this.animateFromPreviousToNext(nameOfNewComponent);
        } else {
          return this.skipPreviousExit(nameOfNewComponent);
        }
      })
    )
  }

  private enterNextComponent(nameOfNewComponent: string) {
    return of(nameOfNewComponent).pipe(
      switchMap(nameOfNewComponent => {
        if (this.hasPreviousComponent() && this.hasNextComponent(nameOfNewComponent)) {
          if(this.previousSize?.width === this.nextSize?.width){
            return this.setNextAnimationOfSameSize(nameOfNewComponent);
          }else{
            return this.setNextComponentWithoutAnimation(nameOfNewComponent);
          }
        } else if (this.hasNextComponent(nameOfNewComponent)) {
          return this.setNextAnimationWithScale(nameOfNewComponent);
        } else {
          return this.setEmptyNextComponent();
        }
      })
    );
  }

  private hasPreviousComponent() {
    return this.component().name && this.component().name !== '';
  }

  private hasNextComponent(nameOfComponent: string) {
    return nameOfComponent !== '';
  }

  private animateFromPreviousToNext(nameOfNewComponent: string) {
    return of(nameOfNewComponent).pipe(
      switchMap(nameOfNewComponent => {
        this.previousSize = this.getSize(this.previousRef!);
        if ((this.previousSize?.width === this.nextSize?.width)) {
          return this.setAnimationSameSizeFromPreviousToNext(nameOfNewComponent);
        } else {
          return this.changeSizeAnimationFromPreviousToNext(nameOfNewComponent);
        }
      })
    );
  }

  private changeSizeAnimationFromPreviousToNext(nameOfNewComponent: string) {
    return of(nameOfNewComponent).pipe(
      tap(() => {
        this.previousSize = this.getSize(this.previousRef!);
        this.initAnimation(this.previousRef!, this.previousSize!, 1,1);
      }),
      delay(10),
      tap(() => {
        if((this.previousSize?.width || 0) < (this.nextSize?.width || 0)){
          this.runAnimation(this.previousRef!, this.previousSize!, this.nextSize!, 0);
        }else{
          this.runAnimation(this.previousRef!, this.previousSize!, this.nextSize!, 0);
        }

      }),
      delay(this.ANIMATION_DELAY),
      tap(() => {
        this.viewContainerRef.clear();
      })
    );
  }

  private setAnimationSameSizeFromPreviousToNext(nameOfNewComponent: string) {
    console.log('setAnimationSameSizeFromPreviusToNext', this.component().name, nameOfNewComponent);
    return of(nameOfNewComponent).pipe(
      tap(() => {
        this.previousSize = this.getSize(this.previousRef!);
        this.previousRef!.location.nativeElement.style.transition = `none`;
        this.previousRef!.location.nativeElement.style.width = `${this.previousSize.width}px`;
        this.previousRef!.location.nativeElement.style.height = `${this.previousSize.height}px`;
        this.previousRef!.location.nativeElement.style.opacity = `1`;
      }),
      delay(10),
      tap(() => {

        this.previousRef!.location.nativeElement.style.transition = `opacity ${this.ANIMATION_DELAY/2}ms`;
        this.previousRef!.location.nativeElement.style.width = `${this.previousSize?.width}px`;
        this.previousRef!.location.nativeElement.style.height = `${this.previousSize?.height}px`;
        this.previousRef!.location.nativeElement.style.opacity = `0`;

      }),
      delay(this.ANIMATION_DELAY/2),
    );
  }

  private skipPreviousExit(nameOfNewComponent: string) {
    return of(nameOfNewComponent).pipe(
      tap(() => {
        this.previousSize = { width: 0, height: 0 };
      })
    )
  }

  private setNextAnimationWithScale(nameOfNewComponent: string) {
    return of(nameOfNewComponent).pipe(
      tap(() => {
        this.nextRef = this.buildComponent(nameOfNewComponent, 0);
        this.component().name = nameOfNewComponent;
        this.initAnimation(this.nextRef!, this.previousSize!, 0, 1);
      }),
      delay(10),
      tap(() => {
        this.runAnimation(this.nextRef!, this.previousSize!, this.nextSize!, 1);
        this.previousRef = this.nextRef;
        this.nextRef = null;
      }),
      delay(this.ANIMATION_DELAY),
      tap(() => {
        this.previousRef!.location.nativeElement.style.height = `auto`;
      })
    )
  }

  private setNextAnimationOfSameSize(nameOfNewComponent: string) {
    console.log('ANIMATION OF SAME SIZE', this.component().name, nameOfNewComponent)
    return of(nameOfNewComponent).pipe(
      tap(() => {
        this.viewContainerRef.clear();

        this.nextRef = this.buildComponent(nameOfNewComponent, 0);
        this.component().name = nameOfNewComponent;

        this.previousRef = this.nextRef;
        this.nextRef = null;

        this.previousRef!.location.nativeElement.style.transition = `none`;
        this.previousRef!.location.nativeElement.style.opacity = `0`;

      }),
      delay(10),
      tap(() => {

        this.previousRef!.location.nativeElement.style.transition = `all ${this.ANIMATION_DELAY/2}ms`;
        this.previousRef!.location.nativeElement.style.opacity = `1`;


      })
    )
  }

  private setEmptyNextComponent() {
    return of('').pipe(
      tap(() => {
        this.nextRef = null;
        this.component().name = '';
      })
    )
  }

  private setNextComponentWithoutAnimation(nameOfNewComponent: string) {
    return of(nameOfNewComponent).pipe(
      tap(() => {
        this.viewContainerRef.clear();
        this.nextRef = this.buildComponent(nameOfNewComponent, 0);
        this.component().name = nameOfNewComponent;
        this.previousRef = this.nextRef;
        this.nextRef = null;
      }),
    )
  }

  private getSize(component: ComponentRef<any>): { width: number, height: number } {
    return { width: component.location.nativeElement.offsetWidth, height: component.location.nativeElement.offsetHeight };
  }

  private initAnimation(componentRef: ComponentRef<any>, size: { width: number, height: number }, opacity: number, scale: number) {
    componentRef.location.nativeElement.style.transition = `none`;
    componentRef.location.nativeElement.style.width = `${size.width}px`;
    componentRef.location.nativeElement.style.height = `${size.height}px`;

    this.elRef.nativeElement.style.transition = `none`;
    this.elRef.nativeElement.style.width = `${size.width}px`;

    const content = componentRef.location.nativeElement.querySelector('.card-content');
    console.log('card-content', content);
    if(content){
      (content as HTMLElement).style.transition = `none`;
      (content as HTMLElement).style.transform = `scale(${scale})`;
      (content as HTMLElement).style.opacity = opacity.toString();
    }

  }

  private runAnimation(componentRef: ComponentRef<any>, previousSize: { width: number, height: number }, size: { width: number, height: number }, opacity: number) {
    componentRef.location.nativeElement.style.transition = `all ${this.ANIMATION_DELAY}ms`;
    componentRef.location.nativeElement.style.width = `${size.width}px`;
    componentRef.location.nativeElement.style.height = `${size.height}px`;

    this.elRef.nativeElement.style.transition = `all ${this.ANIMATION_DELAY}ms`;
    this.elRef.nativeElement.style.width = `${size.width}px`;

    const content = componentRef.location.nativeElement.querySelector('.card-content');
    if(content){

      const styles = window.getComputedStyle(componentRef.location.nativeElement);

      const paddingX = parseFloat(styles.paddingLeft);
      const paddingY = parseFloat(styles.paddingTop);

      const scaleX = ((size.width - paddingX) / (previousSize.width));
      const scaleY = ((size.height - paddingY) / (previousSize.height));

      (content as HTMLElement).style.transition = `transform ${this.ANIMATION_DELAY}ms, opacity ${this.ANIMATION_DELAY/4}ms`;
      (content as HTMLElement).style.transform = `scale(${scaleX}, ${scaleY})`;
      (content as HTMLElement).style.opacity = opacity.toString();
    }
  }

  private buildComponent(name: string, index: number) {
    const factoryComponentData = this.factory.getComponent(name);
    const ref = this.viewContainerRef.createComponent(factoryComponentData.component, { injector: this.injector });
    if (factoryComponentData.values) {
      Object.keys(factoryComponentData.values).forEach(key => {
        (ref as ComponentRef<any>).instance[key] = (factoryComponentData.values as any)[key];
      });
    }
    console.log(this.component().name, '->', name, 'ref', ref);
    return ref;
  }

  private canReplace(nameOfNextComponent: string) {
    return (!!this.component().name || this.component().name === '') && (!!nameOfNextComponent || nameOfNextComponent === '') && (nameOfNextComponent !== this.component().name || nameOfNextComponent === '' || this.component().name === '');
  }

}
