import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDesktopEstatePopupComponent } from '../create-estate-popup.component';
import { configureModule, initStoreWithMockedOwners } from './utils/disable-button.utils';


describe('CreateEstatePopupComponent test submit button disable state', () => {
  let component: CreateDesktopEstatePopupComponent;
  let fixture: ComponentFixture<CreateDesktopEstatePopupComponent>;

  beforeEach(async () => {
    await configureModule();
    initStoreWithMockedOwners();
    fixture = TestBed.createComponent(CreateDesktopEstatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the create button disabled', () => {
    const button = fixture.nativeElement.querySelector('[test-selector="create-estate-submit"]') as HTMLElement;
    expect(button.getAttribute('disabled')).toBe('true');
  });

  it('should have the create button not disabled', () => {
    component.formGroup.get('street')?.setValue('street');
    component.formGroup.get('city')?.setValue('city');
    component.formGroup.get('zip')?.setValue('zip');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('[test-selector="create-estate-submit"]') as HTMLElement;
    expect(button.getAttribute('disabled')).toBeNull();
  })

});
