import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProspectionsDataService } from 'src/app/prospections/data/services/prospections.data.service';
import { SellersMock } from 'src/app/prospections/mocks/sellers.dto.mock';
import { UiPopupService } from 'src/app/ui/services/popup/popup.service';
import { DesktopProspectionsCommandsService } from './desktop.prospections.commands.service';

describe('DesktopProspectionsCommandsService', () => {
  let service: DesktopProspectionsCommandsService;
  let prospectionsDataServiceSpy: jasmine.SpyObj<ProspectionsDataService>;
  let popupServiceSpy: jasmine.SpyObj<UiPopupService>;

  beforeEach(() => {
    const dataServiceSpy = jasmine.createSpyObj('ProspectionsDataService', ['deleteProspection', 'createProspection']);
    const popupSpy = jasmine.createSpyObj('UiPopupService', ['openPopup']);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        DesktopProspectionsCommandsService,
        { provide: ProspectionsDataService, useValue: dataServiceSpy },
        { provide: UiPopupService, useValue: popupSpy }
      ]
    });
    service = TestBed.inject(DesktopProspectionsCommandsService);
    prospectionsDataServiceSpy = TestBed.inject(ProspectionsDataService) as jasmine.SpyObj<ProspectionsDataService>;
    popupServiceSpy = TestBed.inject(UiPopupService) as jasmine.SpyObj<UiPopupService>;
  });

  it('should call deleteProspection when delete is called', () => {
    const id = '123';
    service.delete(id);
    expect(prospectionsDataServiceSpy.deleteProspection).toHaveBeenCalledWith(id);
  });

  it('should call openPopup when createNew is called', () => {
    service.createNew(SellersMock);
    expect(popupServiceSpy.openPopup).toHaveBeenCalled();
  });

});
