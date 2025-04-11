import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestScopeComponent } from './invest-scope.component';

describe('InvestScopeComponent', () => {
  let component: InvestScopeComponent;
  let fixture: ComponentFixture<InvestScopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestScopeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
