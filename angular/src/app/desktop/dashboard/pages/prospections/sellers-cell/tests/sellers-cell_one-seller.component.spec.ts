import { CommonModule } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProspectionStoreFacade } from 'src/app/core/facade/prospection.store.facade';
import { CreateSellerPopupComponent } from '../../../../../../common/popups/create-seller-popup/create-seller-popup.component';
import { ProspectionOneMockedFacade } from '../../../../../../core/facade/mocks/prospection-one.mock.facade';
import { SellersCellComponent } from '../sellers-cell.component';
import { By } from '@angular/platform-browser';
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
        { provide: ProspectionStoreFacade, useClass: ProspectionOneMockedFacade },
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

  it(('should have an empty seller class and no create class'), () => {
    expect(fixture.nativeElement.querySelector('.empty-field')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.create')).toBeFalsy();
  });

  it('should open dropdown with one seller', fakeAsync( async () => {
    const emptyFieldDiv = fixture.debugElement.query(By.css('.empty-field'));
    expect(emptyFieldDiv).toBeTruthy();

    emptyFieldDiv.triggerEventHandler('click', null);
    fixture.detectChanges();
    await fixture.whenStable();

    // emptyFieldDiv.triggerEventHandler('mouseover', null);

    // // Simulate time passage if needed
    // tick(100); // If there's a delay before the style change

    // fixture.detectChanges();
    // const backgroundColor = window.getComputedStyle(emptyFieldDiv.nativeElement).backgroundColor;
    // expect(backgroundColor).toBe('rgb(255, 255, 0)');
  }));

});
