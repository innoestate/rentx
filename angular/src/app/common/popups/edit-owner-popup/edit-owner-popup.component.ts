import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { Owner } from 'src/app/core/models/owner.model';
import { updateOwnerSuccess } from 'src/app/core/store/owner/owners.actions';
import { UxButtonComponent } from 'src/app/ux/popup/components/ux-button/ux-button.component';
import { EditOwnerComponent } from '../../components/edit-owner.component';
import { SignatureComponent } from '../../components/signature-pad/signature.component';

@Component({
  selector: 'edit-owner-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    UxButtonComponent,
    SignatureComponent
  ],
  templateUrl: './edit-owner-popup.component.html',
  styleUrl: './edit-owner-popup.component.scss'
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
