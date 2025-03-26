import { AfterViewInit, Component, computed, input, OnDestroy, output, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';

@Component({
  selector: 'form-popup-footer',
  imports: [
    UiButtonComponent
  ],
  templateUrl: './ui-form-footer.component.html',
  styleUrl: './ui-form-footer.component.scss'
})
export class UiFormFooterComponent implements AfterViewInit, OnDestroy {

  destroyed$ = new Subject<void>();
  formGroup = input.required<FormGroup>();
  onValidate = output<void>();

  okButtonDisabled = computed(() => {
    const invalid = this.invalid();
    const pristine = this.pristine();
    return invalid || pristine;
  })
  pristine = signal(true);
  invalid = signal(false);

  ngAfterViewInit(): void {
    this.formGroup().statusChanges.pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        this.pristine.set(this.formGroup().pristine);
        this.invalid.set(this.formGroup().invalid);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
