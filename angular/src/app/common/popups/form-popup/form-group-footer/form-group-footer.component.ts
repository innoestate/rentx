import { AfterViewInit, Component, computed, effect, input, OnDestroy, output, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';

@Component({
  selector: 'form-group-footer',
  imports: [
    UiButtonComponent
  ],
  templateUrl: './form-group-footer.component.html',
  styleUrl: './form-group-footer.component.scss'
})
export class FormGroupFooterComponent implements AfterViewInit, OnDestroy {

  destroyed$ = new Subject<void>();
  formGroup = input.required<FormGroup>();
  onValidate = output<void>();

  okButtonDisabled = computed(() => {
    const invalid = this.formGroup().invalid;
    const pristine = this.pristine();
    console.log('pristine', pristine);
    return invalid || pristine;
  })
  pristine = signal(true);

  ngAfterViewInit(): void {
    this.formGroup().statusChanges.pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        this.pristine.set(this.formGroup().pristine);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
