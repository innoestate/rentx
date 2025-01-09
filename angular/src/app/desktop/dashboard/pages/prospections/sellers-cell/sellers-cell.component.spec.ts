import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProspectionMockedFacade } from '../../../../../core/facade/prospection.mock.facade';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProspectionStoreFacade } from 'src/app/core/facade/prospection.store.facade';
import { SellersCellComponent } from './sellers-cell.component';
import { By } from '@angular/platform-browser';
import { CreateSellerPopupComponent } from './../../../../../common/popups/create-seller-popup/create-seller-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { delay } from 'rxjs';

const prospection = {
  seller: null
}

describe('SellersCellComponent', () => {

  let component: SellersCellComponent;
  let fixture: ComponentFixture<SellersCellComponent>;
  let modalService: NzModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellersCellComponent],
      providers: [
        { provide: ProspectionStoreFacade, useClass: ProspectionMockedFacade },
        NzModalService
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        NzInputNumberModule,
        ReactiveFormsModule,
        NzIconModule,
        NzDropDownModule,
        NzSelectModule,
        NzModalModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellersCellComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NzModalService);
    fixture.componentRef.setInput('prospection', prospection);
    fixture.detectChanges();
    await fixture.whenStable();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(('should have an empty seller class'), () => {
    expect(fixture.nativeElement.querySelector('.empty-field')).toBeTruthy();
  });

  it('should open the modal for creating a new seller', async () => {
    const button = fixture.nativeElement.querySelector('.create');
    const openSpy = spyOn(modalService, 'create').and.callThrough();

    button.click();
    fixture.detectChanges();

    expect(openSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      nzContent: CreateSellerPopupComponent
    }));
  });

});
