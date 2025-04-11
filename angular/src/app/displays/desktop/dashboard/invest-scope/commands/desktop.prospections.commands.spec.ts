import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { sellersDtoMock } from 'src/app/features/sellers/mocks/sellers.dto.mock';
import { UiPopupService } from 'src/app/ui/services/popup/popup.service';
import { DesktopProspectionsCommandsService } from './desktop.prospections.commands.service';
import { UiModule } from 'src/app/ui/ui.module';

describe('DesktopProspectionsCommandsService', () => {
  let service: DesktopProspectionsCommandsService;
  let prospectionsDataServiceSpy: jasmine.SpyObj<ProspectionsDataService>;
  let popupServiceSpy: jasmine.SpyObj<UiPopupService>;

  beforeEach(() => {
    const dataServiceSpy = jasmine.createSpyObj('ProspectionsDataService', ['deleteProspection', 'createProspection']);
    const popupSpy = jasmine.createSpyObj('UiPopupService', ['openPopup', 'openFormPopup', 'openContinuableFormPopup']);

    TestBed.configureTestingModule({
      imports: [
        UiModule
      ],
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
    service.createNew(sellersDtoMock);
    expect(popupServiceSpy.openContinuableFormPopup).toHaveBeenCalled();
  });

  it('should create fields without sellers field', () => {
    expect(service.getCreateNewFormFields([]).find( field => field.key === 'seller_id')).toBeUndefined();
  })

  it('should create fields with sellers field', () => {
    const sellers = sellersDtoMock;
    expect(service.getCreateNewFormFields(sellers).find( field => field.key === 'seller_id')).not.toBeUndefined();
  })


});
