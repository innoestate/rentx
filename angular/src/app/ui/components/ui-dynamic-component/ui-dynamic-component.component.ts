import { Component, ComponentRef, EventEmitter, model, ViewContainerRef } from '@angular/core';
import { delay, filter, tap } from 'rxjs';
import { DynamicComponentFactoryService } from '../../services/factory/dynamic-component-factory.service';

@Component({
  selector: 'ui-dynamic-component',
  standalone: true,
  template: '',
})
export class UiDynamicComponentComponent {

  component = model.required<{name: string, replace: EventEmitter<string>}>();
  ref!: ComponentRef<any> | null;
  ANIMATION_DELAY = 300;
  SCALE_START = 0.95;
  indexIterator = 0;

  constructor(private factory: DynamicComponentFactoryService, private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.ref = this.viewContainerRef.createComponent(this.factory.getComponent(this.component().name), { index: 0});

    this.initInAnimation();
    setTimeout(() => {
      this.startInAnimation();
      setTimeout(() => {
        this.endInAnimation();
      }, 100)
    }, 0);


    this.component().replace.pipe(
      filter(name => this.canReplace(name)),
      tap(() => this.startOutAnimation()),
      delay(0),
      tap(() => this.endOutAnimation()),
      delay(this.ANIMATION_DELAY),
      tap(name => this.replace(name)),
      delay(0),
      tap(() => this.startInAnimation()),
      delay(this.ANIMATION_DELAY),
      tap(() => this.endInAnimation()),
    ).subscribe();
  }

  private canReplace(name: string){
    return (!!this.component().name || this.component().name === '') && (!!name || name === '') && (name !== this.component().name);
  }

  private replace(name: string){
    this.viewContainerRef.clear();
    this.component().name = name;
    if(name === ''){
      this.ref = null;
    }else{
      this.ref = this.viewContainerRef.createComponent(this.factory.getComponent(name), { index: 0});
      this.initInAnimation();
    }
  }

  private initInAnimation(){
    const componentRef = this.ref?.location.nativeElement;
    if(!componentRef) return;
    componentRef.style.transition = `${this.ANIMATION_DELAY}ms ease-out`;
    (componentRef as HTMLDivElement).style.opacity = '0';
  }

  private startInAnimation(){
    const componentRef = this.ref?.location.nativeElement;
    if(!componentRef) return;
    (componentRef as HTMLDivElement).style.opacity = '0';


    (componentRef as HTMLDivElement).style.transform = `scale(${this.SCALE_START})`;
  }

  private startOutAnimation(){
    const componentRef = this.ref?.location.nativeElement;
    if(!componentRef) return;
    componentRef.style.transition = `${this.ANIMATION_DELAY}ms ease-out`;
    (componentRef as HTMLDivElement).style.opacity = '0';
    (componentRef as HTMLDivElement).style.transform = `scale(${this.SCALE_START})`;
  }

  private endInAnimation(){
    const componentRef = this.ref?.location.nativeElement;
    if(!componentRef) return;
    (componentRef as HTMLDivElement).style.opacity = '1';
    (componentRef as HTMLDivElement).style.transform = 'scale(1)';
  }

  private endOutAnimation(){
    const componentRef = this.ref?.location.nativeElement;
    if(!componentRef) return;
    (componentRef as HTMLDivElement).style.opacity = '0';
    (componentRef as HTMLDivElement).style.transform = `scale(${this.SCALE_START})`;
  }

}
