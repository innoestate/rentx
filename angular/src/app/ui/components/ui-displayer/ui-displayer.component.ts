import { Directive, ElementRef } from '@angular/core';
import { delay, of, tap } from 'rxjs';



@Directive()
export class UiDisplayerComponent {

  constructor(protected elRef: ElementRef) { }

  static ANIMATION_DELAY = 500;
  static SCALE = 0.95;

  appears() {
    return of(null).pipe(
      tap(() => {
        this.elRef.nativeElement.style.transition = 'none';
        this.elRef.nativeElement.style.opacity = `1`;
        this.elRef.nativeElement.style.transform = `scale(${UiDisplayerComponent.SCALE})`;

        const cardContent = this.elRef.nativeElement.querySelector('.card-content') as HTMLDivElement;
        if(cardContent){
          cardContent.style.transition = 'none';
          cardContent.style.opacity = `0`;
        }

      }),
      delay(0),
      tap(() => {
        this.elRef.nativeElement.style.transition = `all ${UiDisplayerComponent.ANIMATION_DELAY}ms ease-out`;
        this.elRef.nativeElement.style.transform = `scale(1)`;

        const cardContent = this.elRef.nativeElement.querySelector('.card-content') as HTMLDivElement;
        if(cardContent){
          cardContent.style.transition = `all ${UiDisplayerComponent.ANIMATION_DELAY}ms ease-out`;
          cardContent.style.opacity = `1`;
        }
      }),
      delay(UiDisplayerComponent.ANIMATION_DELAY)
    );
  }

  replace(width: number, height: number) {

  }

  desapears() {
    return of(null).pipe(
      tap(() => {
        this.elRef.nativeElement.style.transition = 'none';
        this.elRef.nativeElement.style.opacity = `1`;
        this.elRef.nativeElement.style.transform = 'scale(1)';

        const cardContent = this.elRef.nativeElement.querySelector('.card-content') as HTMLDivElement;
        if(cardContent){
          cardContent.style.transition = 'none';
          cardContent.style.opacity = `1`;
        }
      }),
      tap(() => {
        this.elRef.nativeElement.style.transition = `all ${UiDisplayerComponent.ANIMATION_DELAY}ms ease-out`;
        this.elRef.nativeElement.style.transform = `scale(${UiDisplayerComponent.SCALE})`;

        const cardContent = this.elRef.nativeElement.querySelector('.card-content') as HTMLDivElement;
        if(cardContent){
          cardContent.style.transition = `all ${UiDisplayerComponent.ANIMATION_DELAY}ms ease-out`;
          cardContent.style.opacity = `0`;
        }
      }),
      delay(UiDisplayerComponent.ANIMATION_DELAY)
    );
  }

}
