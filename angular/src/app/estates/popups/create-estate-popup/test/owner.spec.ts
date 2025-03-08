import { fakeAsync, TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { MockOwnersService } from 'src/app/core/services/owners.service.mocked';
import { CreateDesktopEstatePopupComponent } from '../create-estate-popup.component';
import { configureModule, initStoreWithMockedOwners } from './utils/tests.utils';


describe('CreateEstatePopupComponent test the owner fields', () => {
  let component: CreateDesktopEstatePopupComponent;

  beforeEach(async () => {
    await configureModule();
    initStoreWithMockedOwners();
    let fixture = TestBed.createComponent(CreateDesktopEstatePopupComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should have the owner field value set to the first owner by default', fakeAsync( async() => {
    const ownerService = TestBed.inject(MockOwnersService);
    const firstOwner = (await firstValueFrom(ownerService.get()))[0];
    expect(component.formGroup.get('owner_id')?.value).toBe(firstOwner.id);
  }));

});
