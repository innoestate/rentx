import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from 'jasmine-marbles';
import { Observable } from "rxjs";
import { sellerDtoMock1 } from "../../../mocks/sellers.dto.mock";
import { SellersHttpService } from "../../http/sellers.http.service";
import { createSeller, createSellerFailure, createSellerSuccess, loadSellers, loadSellersFailure, loadSellersSuccess, removeSeller, removeSellerFailure, removeSellerSuccess, updateSeller, updateSellerFailure, updateSellerSuccess } from "../sellers.actions";
import { SellersEffects } from "../sellers.effects";

describe('Sellers ngrx test effects', () => {
  let actions$: Observable<any>;
  let effects: SellersEffects;
  let dataService: jasmine.SpyObj<SellersHttpService>;

  beforeEach(() => {
    configureTestingModule();
  });

  it('should complete loadSuccessful action after loading sellers', () => {
    const expected = getSuccessfulyLoadingCompletion();
    expect(effects.loadSellers$).toBeObservable(expected);
  });

  it('should complete loadError action after loading sellers', () => {
    const expected = getFailLoadingCompletion();
    expect(effects.loadSellers$).toBeObservable(expected);
  });

  it('should complete createSuccess action after creating a new seller', () => {
    const expected = getSuccessfulyCreatingCompletion();
    expect(effects.addSeller$).toBeObservable(expected);
  });

  it('should complete createError action after creating a new seller', () => {
    const expected = getFailCreatingCompletion();
    expect(effects.addSeller$).toBeObservable(expected);
  });

  it('should complete update success after updating a seller', () => {
    const expected = getSuccessfulyUpdatingCompletion();
    expect(effects.updateSeller$).toBeObservable(expected);
  });

  it('should complete update error after updating a seller', () => {
    const expected = getFailUpdatingCompletion();
    expect(effects.updateSeller$).toBeObservable(expected);
  });

  it('should complete remove success after removing a seller', () => {
    const expected = getSuccessfulyRemovingCompletion();
    expect(effects.removeSeller$).toBeObservable(expected);
  });

  it('should complete remove error after removing a seller', () => {
    const expected = getFailRemovingCompletion();
    expect(effects.removeSeller$).toBeObservable(expected);
  });

  const configureTestingModule = () => {
    const spy = jasmine.createSpyObj('SellersHttpService', ['getAll', 'create', 'update', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        SellersEffects,
        provideMockActions(() => actions$),
        {
          provide: SellersHttpService,
          useValue: spy
        }
      ]
    });
    dataService = TestBed.inject(SellersHttpService) as jasmine.SpyObj<SellersHttpService>;
    effects = TestBed.inject(SellersEffects);
  };

  const getFailLoadingCompletion = () => {
    const error = new Error('Error loading sellers from mocked http service.');
    const completion = loadSellersFailure({ error });
    actions$ = hot('a', { a: loadSellers() });
    dataService.getAll.and.returnValue(cold('---#', {}, { error }));
    const expected = cold('---b', { b: completion });
    return expected;
  };

  const getSuccessfulyLoadingCompletion = () => {
    const completion = loadSellersSuccess({ sellers: [{ ...sellerDtoMock1 }] });
    actions$ = hot('a', { a: loadSellers() });
    dataService.getAll.and.returnValue(cold('---b', { b: [{ ...sellerDtoMock1 }] }));
    return cold('---b', { b: completion });
  };

  const getSuccessfulyCreatingCompletion = () => {
    const completion = createSellerSuccess({ seller: { ...sellerDtoMock1 } });
    actions$ = hot('a', { a: createSeller({ seller: { ...sellerDtoMock1 } }) });
    dataService.create.and.returnValue(cold('--b', { b: { ...sellerDtoMock1 } }));
    return cold('--b', { b: completion });
  };

  const getFailCreatingCompletion = () => {
    const error = new Error('Error creating seller from mocked http service.');
    const completion = createSellerFailure({ error });
    actions$ = hot('a', { a: createSeller({ seller: { ...sellerDtoMock1 } }) });
    dataService.create.and.returnValue(cold('--#', {}, { error }));
    return cold('--b', { b: completion });
  };

  const getSuccessfulyUpdatingCompletion = () => {
    const completion = updateSellerSuccess({ seller: { ...sellerDtoMock1 } });
    actions$ = hot('a', { a: updateSeller({ seller: { ...sellerDtoMock1 } }) });
    dataService.update.and.returnValue(cold('--b', { b: { ...sellerDtoMock1 } }));
    return cold('--b', { b: completion });
  };

  const getFailUpdatingCompletion = () => {
    const error = new Error('Error updating seller from mocked http service.');
    const completion = updateSellerFailure({ error });
    actions$ = hot('a', { a: updateSeller({ seller: { ...sellerDtoMock1 } }) });
    dataService.update.and.returnValue(cold('--#', {}, { error }));
    return cold('--b', { b: completion });
  };

  const getSuccessfulyRemovingCompletion = () => {
    const completion = removeSellerSuccess({ id: sellerDtoMock1.id! });
    actions$ = hot('a', { a: removeSeller({ id: sellerDtoMock1.id! }) });
    dataService.delete.and.returnValue(cold('--b', { b: undefined }));
    return cold('--b', { b: completion });
  };

  const getFailRemovingCompletion = () => {
    const error = new Error('Error removing seller from mocked http service.');
    const completion = removeSellerFailure({ error });
    actions$ = hot('a', { a: removeSeller({ id: sellerDtoMock1.id! }) });
    dataService.delete.and.returnValue(cold('--#', {}, { error }));
    return cold('--b', { b: completion });
  };
});
