import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UxTableComponent } from '../ux-table.component';
import { rowsMock } from './mock/rows.mock';
import { columnsMock } from './mock/columns.mock';

describe('UxTableComponent should have the values in correct columns and rows', () => {
  let component: UxTableComponent;
  let fixture: ComponentFixture<UxTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UxTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UxTableComponent);
    fixture.componentRef.setInput('rows', rowsMock);
    fixture.componentRef.setInput('columns', columnsMock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
