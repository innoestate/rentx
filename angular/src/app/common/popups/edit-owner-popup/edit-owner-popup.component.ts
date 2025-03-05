import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { Owner } from 'src/app/core/models/owner.model';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';
import { EditOwnerComponent } from '../../components/edit-owner.component';
import { SignatureComponent } from '../../components/signature-pad/signature.component';
import { updateOwnerSuccess } from 'src/app/owners/data/ngrx/owners.actions';

@Component({
    selector: 'edit-owner-popup',
    imports: [
        ReactiveFormsModule,
        NzSelectModule,
        UiButtonComponent,
        SignatureComponent
    ],
    templateUrl: './edit-owner-popup.component.html',
    styleUrl: './edit-owner-popup.component.scss',
    standalone: true
})
export class EditOwnerPopupComponent extends EditOwnerComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<void>();

  constructor(@Inject(NZ_MODAL_DATA) public override data: { owner: Owner } ,protected override formBuilder: FormBuilder, protected override store: Store, private modalRef: NzModalRef, private actions$: Actions) {
    super(data, formBuilder, store);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.actions$.pipe(
      ofType(updateOwnerSuccess),
      takeUntil(this.destroyed$),
      take(1),
      tap( () => this.modalRef.close())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
