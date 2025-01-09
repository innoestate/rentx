import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProspectionMockedFacade } from '../../../../../core/facade/prospection.mock.facade';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProspectionStoreFacade } from 'src/app/core/facade/prospection.store.facade';
import { SellersCellComponent } from './sellers-cell.component';


const prospection = {
  seller: {
    id: 1,
    name: 'John Doe',
    email: 'zvE0w@example.com',
  }
}

describe('SellersCellComponent', () => {
  let component: SellersCellComponent;
  let fixture: ComponentFixture<SellersCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellersCellComponent],
      providers: [
        { provide: ProspectionStoreFacade, useClass: ProspectionMockedFacade },
      ],
      imports: [
        NzInputNumberModule,
        NzIconModule,
        NzDropDownModule,
        NzSelectModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellersCellComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('prospection', prospection);
    fixture.detectChanges();
    await fixture.whenStable();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
