import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiNavigationComponent } from './ui-navigation.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('UiNavigationComponent', () => {
  let component: UiNavigationComponent;
  let fixture: ComponentFixture<UiNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiNavigationComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiNavigationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('navigators', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
