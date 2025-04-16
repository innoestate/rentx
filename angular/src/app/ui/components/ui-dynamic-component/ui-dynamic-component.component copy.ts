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
  ref!: ComponentRef<any> | null;
  newRef!: ComponentRef<any> | null;
  ANIMATION_DELAY = 2500;
  SCALE_START = 0.95;
  indexIterator = 0;
  previousSize: { width: number, height: number } | null = null;
  nextSize: { width: number, height: number } | null = null;

  constructor(private factory: DynamicComponentFactoryService, private viewContainerRef: ViewContainerRef, private elRef: ElementRef) { }

  ngOnInit(): void {

    this.ref = this.buildComponent(this.component().name, 0);
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
      switchMap(nameOfNewComponent => this.handleOutAnimation(nameOfNewComponent)),
      switchMap(nameOfNewComponent => this.replace(nameOfNewComponent)),
      // switchMap(nameOfNewComponent => this.handleInAnimation(nameOfNewComponent)),
    ).subscribe();
  }

  //make the out animation if a component exist already.
  //if not or if component is empty, then do not do any animation
  private handleOutAnimation(nameOfNewComponent: string) {
    if (this.component().name !== 'prospectionDescription') {
      return of(nameOfNewComponent);
    } else {
      return of(nameOfNewComponent).pipe(
        tap(() => {

          //PREPARATION DE LA SORTIE

          //Si le composant suivant n'est pas vide, alors on créer le composant suivant en le masquant
          //pour prendre les mesures et gérer l'animation en fonction.
          if (nameOfNewComponent && nameOfNewComponent !== '') {

            this.newRef = this.buildComponent(nameOfNewComponent, 1);
            this.newRef!.location.nativeElement.style.opacity = '0';
            this.newRef!.location.nativeElement.style.position = 'absolute';

          }
          //dans tous les cas, on prends les mesures du composant actuel pour
          //dire que la taille est bien celle du composant actuel.

          const width = `${this.ref?.location?.nativeElement.offsetWidth}px`;
          const height = `${this.ref?.location?.nativeElement.offsetHeight}px`;

          this.ref!.location.nativeElement.style.transition = `width ${this.ANIMATION_DELAY}ms,
            padding ${this.ANIMATION_DELAY}ms,
            margin ${this.ANIMATION_DELAY}ms,
            height ${this.ANIMATION_DELAY}ms`;
          this.ref!.location.nativeElement.style.width = width;
          this.ref!.location.nativeElement.style.height = height;

          //On va prendre le contenu et le scaler en même temps
          if (((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)) {
            ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.transition = `transform ${this.ANIMATION_DELAY}ms, opacity ${this.ANIMATION_DELAY/4}ms`;
            ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.transform = `scale(1, 1)`;
            ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.opacity = `1`;
          }


        }),
        delay(0),
        tap(() => {

          //APPLICATION DE LA SORTIE
          const previousWidth = this.ref?.location?.nativeElement.offsetWidth;
          const previousHeight = this.ref?.location?.nativeElement.offsetHeight;

          let widthOut = 0;
          let heightOut = 0;

          if (this.newRef) {
            widthOut = this.newRef!.location.nativeElement.offsetWidth;
            heightOut = this.newRef!.location.nativeElement.offsetHeight;
          } else {
            this.ref!.location.nativeElement.style.padding = '0';
            this.ref!.location.nativeElement.style.margin = '0';
          }

          this.ref!.location.nativeElement.style.width = `${widthOut}px`;
          this.ref!.location.nativeElement.style.height = `${heightOut}px`;

          ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.transform = `scale(0, 0)`;
          ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.opacity = `0`;


        }),
        delay(this.ANIMATION_DELAY),
      );
    }
  }

  private replace(nameOfComponentToCreate: string) {
    return of(nameOfComponentToCreate).pipe(
      tap(() => {
        if (this.ref) {
          this.viewContainerRef.remove(0);
        }
        this.component().name = nameOfComponentToCreate;
        if (this.isAnEmptyComponent(nameOfComponentToCreate)) {
          this.ref = null;
        } else {

          if(this.ref){
            let previousWidth = this.ref!.location?.nativeElement.offsetWidth || 0;
            let previousHeight = this.ref!.location?.nativeElement.offsetHeight || 0;
            this.previousSize = previousWidth || previousHeight ? { width: previousWidth, height: previousHeight } : null;
          }

          if (!this.newRef) {
            this.ref = this.buildComponent(nameOfComponentToCreate, 0);
          } else {
            this.ref = this.newRef;
          }

          this.ref!.location.nativeElement.style.position = 'relative';
          this.ref!.location.nativeElement.style.opacity = '1';
          this.ref!.location.nativeElement.style.transition = `all ${this.ANIMATION_DELAY}ms`;// height ${this.ANIMATION_DELAY}ms`;

          let startWidth = this.previousSize?.width || 0;
          let startHeight = this.previousSize?.height || 0;

          this.nextSize = { width: this.ref!.location?.nativeElement.offsetWidth || 0, height: this.ref!.location?.nativeElement.offsetHeight || 0 };

          this.ref!.location.nativeElement.style.width = `${startWidth}px`;
          this.ref!.location.nativeElement.style.height = `${startHeight}px`;

          this.newRef = null;
          // ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.opacity = `0`;
          // ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.transform = `scale(0, 0)`;

        }
      }),
      delay(0),
      tap(() => {

        this.ref!.location.nativeElement.style.width = `${this.nextSize?.width}px`;
        this.ref!.location.nativeElement.style.height = `${this.nextSize?.height}px`;

        // ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.opacity = `1`;
        // ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.transform = `scale(1, 1)`;

      })
    )
  }

  //make the in animation
  private handleInAnimation(nameOfComponentToCreate: string) {

    let finalWidth = 0;
    let finalHeight = 0;
    if (nameOfComponentToCreate !== 'prospectionDescription' && nameOfComponentToCreate !== 'navigation') {
      return of(nameOfComponentToCreate);
    } else {
      return of(nameOfComponentToCreate).pipe(
        tap(() => {

          //PREPARE L'ANIMATION D'ENTREE DU PROCHAIN COMPOSANT
          finalWidth = this.ref!.location.nativeElement.offsetWidth;
          finalHeight = this.ref!.location.nativeElement.offsetHeight;


          // this.ref!.location.nativeElement.replaceChildren();

          ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.transition = `all ${this.ANIMATION_DELAY}ms`;
          ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.opacity = `1`;
          ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.transform = `scale(1, 1)`;

        }),
        delay(0),
        tap(() => {


          if (((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)) {
            // ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.transition = `all ${this.ANIMATION_DELAY}ms`;
          }

          this.ref!.location.nativeElement.style.width = finalWidth + 'px';
          this.ref!.location.nativeElement.style.height = finalHeight + 'px';
        }),
        delay(this.ANIMATION_DELAY),
        tap(() => {
          // ((this.ref!.location.nativeElement as HTMLElement).querySelector('.card-content') as HTMLElement)!.style.opacity = `1`;

          // this.ref!.location.nativeElement.style.height = '100%';
        })

      );
    }
  }

  private buildComponent(name: string, index: number) {
    const factoryComponentData = this.factory.getComponent(name);
    const ref = this.viewContainerRef.createComponent(factoryComponentData.component, { index: index });
    if (factoryComponentData.values) {
      Object.keys(factoryComponentData.values).forEach(key => {
        (ref as ComponentRef<any>).instance[key] = (factoryComponentData.values as any)[key];
      });
    }
    ref.location.nativeElement.style.transition = `width ${this.ANIMATION_DELAY}ms,
                                                  height ${this.ANIMATION_DELAY}ms,`;

    return ref;
  }

  private canReplace(name: string) {
    return (!!this.component().name || this.component().name === '') && (!!name || name === '') && (name !== this.component().name || name === '' || this.component().name === '');
  }

  private isAnEmptyComponent(name: string) {
    return name === '';
  }

}
