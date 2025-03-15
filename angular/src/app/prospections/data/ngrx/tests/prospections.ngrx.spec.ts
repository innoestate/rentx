import { TestBed } from "@angular/core/testing"
import { provideMockActions } from "@ngrx/effects/testing"
import { cold, hot } from 'jasmine-marbles'
import { Observable } from "rxjs"
import { ProspectionsHttpService } from "../../http/prospections.http.service"
import { ProspectionDtoMock1 } from "../../test/mocks/prospections.dto.mock"
import { createProspection, createProspectionFailure, createProspectionSuccess, deleteProspection, deleteProspectionFailure, deleteProspectionSuccess, loadProspections, loadProspectionsFailure, loadProspectionsSuccess, updateProspection, updateProspectionFailure, updateProspectionSuccess } from "../prospections.actions"
import { ProspectionsEffects } from "../prospections.effects"

describe('Prospections NGRX test effects', () => {

  let actions$: Observable<any>;
  let effects: ProspectionsEffects;
  let dataService: jasmine.SpyObj<ProspectionsHttpService>;

  beforeEach(() => {
    configureTestingModule();
  })

  it('should complete loadSuccessful action after loading prospections', () => {
    const expected = getSuccessfulyLoadingCompletion();
    expect(effects.loadProspections$).toBeObservable(expected);
  })

  it('should complete loadError action after loading prospeections', () => {
    const expected = getFailLoadingCompletion();
    expect(effects.loadProspections$).toBeObservable(expected);
  })

  it('should complete createSuccess action after creating a new prospection', () => {
    const expected = getSuccessfulyCreatingCompletion();
    expect(effects.createProspection$).toBeObservable(expected);
  })

  it('should complete createError action after creating a new prospection', () => {
    const expected = getFailCreatingCompletion();
    expect(effects.createProspection$).toBeObservable(expected);
  })

  it('should complete update success after updating a prospection', () => {
    const expected = getSuccessfulyUpdatingCompletion();
    expect(effects.updateProspection$).toBeObservable(expected);
  })

  it('should complete update error after updating a prospection', () => {
    const expected = getFailUpdatingCompletion();
    expect(effects.updateProspection$).toBeObservable(expected);
  })

  it('should complete delete success after deleting a prospection', () => {
    const expected = getSuccessfulyDeletingCompletion();
    expect(effects.deleteProspection$).toBeObservable(expected);
  })

  it('should complete delete error after deleting a prospection', () => {
    const expected = getFailDeletingCompletion();
    expect(effects.deleteProspection$).toBeObservable(expected);
  })

  const configureTestingModule = () => {
    const spy = jasmine.createSpyObj('ProspectionsHttpService', ['getAll', 'create', 'update', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        ProspectionsEffects,
        provideMockActions(() => actions$),
        {
          provide: ProspectionsHttpService,
          useValue: spy
        }
      ]
    })
    dataService = TestBed.inject(ProspectionsHttpService) as jasmine.SpyObj<ProspectionsHttpService>;
    effects = TestBed.inject(ProspectionsEffects);
  }

  const getFailLoadingCompletion = () => {
    const error = new Error('Error loading prospections from mocked http service.');
    const completion = loadProspectionsFailure({ error });
    actions$ = hot('a', { a: loadProspections() });
    dataService.getAll.and.returnValue(cold('---#', {}, { error }));
    const expected = cold('---b', { b: completion });
    return expected;
  }

  const getSuccessfulyLoadingCompletion = () => {
    const completion = loadProspectionsSuccess({ prospections: [{...ProspectionDtoMock1}]});
    actions$ = hot('a', { a: loadProspections() });
    dataService.getAll.and.returnValue(cold('---b', { b: [{...ProspectionDtoMock1}]}));
    return cold('---b', { b: completion});
  }

  const getSuccessfulyCreatingCompletion = () => {
    const completion = createProspectionSuccess({ prospection : {...ProspectionDtoMock1}});
    actions$ = hot('a', { a: createProspection({ prospection: {...ProspectionDtoMock1}}) });
    dataService.create.and.returnValue(cold('--b', { b: {...ProspectionDtoMock1}}));
    return cold('--b', { b: completion});
  }

  const getFailCreatingCompletion = () => {
    const error = new Error('Error creating prospection from mocked http service.');
    const completion = createProspectionFailure({ error });
    actions$ = hot('a', { a: createProspection({ prospection: {...ProspectionDtoMock1}}) });
    dataService.create.and.returnValue(cold('--#', {}, { error }));
    return cold('--b', { b: completion });
  }

  const getSuccessfulyUpdatingCompletion = () => {
    const completion = updateProspectionSuccess({ prospection : {...ProspectionDtoMock1}});
    actions$ = hot('a', { a: updateProspection({ prospection: {...ProspectionDtoMock1}}) });
    dataService.update.and.returnValue(cold('--b', { b: {...ProspectionDtoMock1}}));
    return cold('--b', { b: completion});
  }

  const getFailUpdatingCompletion = () => {
    const error = new Error('Error updating prospection from mocked http service.');
    const completion = updateProspectionFailure({ error });
    actions$ = hot('a', { a: updateProspection({ prospection: {...ProspectionDtoMock1}}) });
    dataService.update.and.returnValue(cold('--#', {}, { error }));
    return cold('--b', { b: completion });
  }

  const getSuccessfulyDeletingCompletion = () => {
    const completion = deleteProspectionSuccess({ id: '1' });
    actions$ = hot('a', { a: deleteProspection({ id: '1' }) });
    dataService.delete.and.returnValue(cold('--b', { b: '1' }));
    return cold('--b', { b: completion });
  }

  const getFailDeletingCompletion = () => {
    const error = new Error('Error deleting prospection from mocked http service.');
    const completion = deleteProspectionFailure({ error });
    actions$ = hot('a', { a: deleteProspection({ id: '1' }) });
    dataService.delete.and.returnValue(cold('--#', {}, { error }));
    return cold('--b', { b: completion });
  }

});
