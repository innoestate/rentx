import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatesPageComponent } from './estates-page.component';

describe('EstatesPageComponent', () => {
  let component: EstatesPageComponent;
  let fixture: ComponentFixture<EstatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstatesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
