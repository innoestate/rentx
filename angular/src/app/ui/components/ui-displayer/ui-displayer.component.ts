import { Directive, ElementRef } from '@angular/core';
import { delay, of, tap } from 'rxjs';


@Directive()
export class UiDisplayerComponent {

  constructor(protected elRef: ElementRef) {
    this.elRef.nativeElement.style.opacity = `0`;
  }

  static ANIMATION_DELAY = 500;
  static SCALE = 0.95;

  appears() {
    return of(null).pipe(
      tap(() => {
        this.prepareContainerAnimation(UiDisplayerComponent.SCALE);
        this.prepareContentAnimation(0);
      }),
      delay(0),
      tap(() => {
        requestAnimationFrame(() => {
          this.runContainerAnimation(1);
          this.runContentAnimation(1);
        });
      }),
      delay(UiDisplayerComponent.ANIMATION_DELAY)
    );
  }

  desapears() {
    return of(null).pipe(
      tap(() => {
        this.prepareContainerAnimation(1);
        this.prepareContentAnimation(1);
      }),
      tap(() => {
        this.runContainerAnimation(UiDisplayerComponent.SCALE)
        this.runContentAnimation(0);
      }),
      delay(UiDisplayerComponent.ANIMATION_DELAY)
    );
  }

  private prepareContainerAnimation(scale: number){
    this.elRef.nativeElement.style.opacity = `1`;
    this.elRef.nativeElement.style.transition = 'none';
    this.elRef.nativeElement.style.transform = `scale(${scale})`;
  }

  private runContainerAnimation(scale: number){
    this.elRef.nativeElement.style.transition = `all ${UiDisplayerComponent.ANIMATION_DELAY}ms ease-out`;
    this.elRef.nativeElement.style.transform = `scale(${scale})`;
  }

  private prepareContentAnimation(opacity : 0 | 1) {
    const cardContent = this.elRef.nativeElement.querySelector('.card-content') as HTMLDivElement;
    if(cardContent){
      cardContent.style.transition = 'none';
      cardContent.style.opacity = `${opacity}`;
    }
  }

  private runContentAnimation(opacity : 0 | 1) {
    const cardContent = this.elRef.nativeElement.querySelector('.card-content') as HTMLDivElement;
    if(cardContent){
      cardContent.style.transition = `all ${UiDisplayerComponent.ANIMATION_DELAY}ms ease-out`;
      cardContent.style.opacity = `${opacity}`;
    }
  }

}
