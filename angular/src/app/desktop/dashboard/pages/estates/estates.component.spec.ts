import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstatesPageDesktopComponent } from './estates.component';


describe('EstatesComponent', () => {
  let component: EstatesPageDesktopComponent;
  let fixture: ComponentFixture<EstatesPageDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstatesPageDesktopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatesPageDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
