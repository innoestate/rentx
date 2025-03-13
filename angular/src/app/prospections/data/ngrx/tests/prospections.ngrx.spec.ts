import { TestBed } from "@angular/core/testing"
import { provideMockActions } from "@ngrx/effects/testing"
import { cold, hot } from 'jasmine-marbles'
import { Observable } from "rxjs"
import { ProspectionsHttpService } from "../../http/prospections.http.service"
import { ProspectionDtoMock1 } from "../../test/mocks/prospections.dto.mock"
import { createProspection, createProspectionFailure, createProspectionSuccess, deleteProspection, deleteProspectionFailure, deleteProspectionSuccess, loadProspections, loadProspectionsFailure, loadProspectionsSuccess, updateProspection, updateProspectionFailure, updateProspectionSuccess } from "../prospections.actions"
import { ProspectionsEffects } from "../prospections.effects"

describe('Prospections NGRX Tests', () => {

  let actions$: Observable<any>;
  let effects: ProspectionsEffects;
  let dataService: jasmine.SpyObj<ProspectionsHttpService>;

  beforeEach(() => {

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

  })

  it('should dispatch load success', () => {
    const completion = loadProspectionsSuccess({ prospections: [{...ProspectionDtoMock1}]});
    actions$ = hot('a', { a: loadProspections() });
    dataService.getAll.and.returnValue(cold('---b', { b: [{...ProspectionDtoMock1}]}));
    const expected = cold('---b', { b: completion});
    expect(effects.loadProspections$).toBeObservable(expected);
  })

  it('should dispatch load error', () => {
    const error = new Error('Error loading prospections from mocked http service.');
    const completion = loadProspectionsFailure({ error });

    actions$ = hot('a', { a: loadProspections() });
    dataService.getAll.and.returnValue(cold('---#', {}, { error }));
    const expected = cold('---b', { b: completion });
    expect(effects.loadProspections$).toBeObservable(expected);
  })

  it('should dispatch create success', () => {
    const completion = createProspectionSuccess({ prospection : {...ProspectionDtoMock1}});
    actions$ = hot('a', { a: createProspection({ prospection: {...ProspectionDtoMock1}}) });
    dataService.create.and.returnValue(cold('--b', { b: {...ProspectionDtoMock1}}));
    const expected = cold('--b', { b: completion});
    expect(effects.createProspection$).toBeObservable(expected);
  })

  it('should dispatch create error', () => {
    const error = new Error('Error creating prospection from mocked http service.');
    const completion = createProspectionFailure({ error });

    actions$ = hot('a', { a: createProspection({ prospection: {...ProspectionDtoMock1}}) });
    dataService.create.and.returnValue(cold('--#', {}, { error }));
    const expected = cold('--b', { b: completion });
    expect(effects.createProspection$).toBeObservable(expected);
  })

  it('should dispatch update success', () => {
    const completion = updateProspectionSuccess({ prospection : {...ProspectionDtoMock1}});
    actions$ = hot('a', { a: updateProspection({ prospection: {...ProspectionDtoMock1}}) });
    dataService.update.and.returnValue(cold('--b', { b: {...ProspectionDtoMock1}}));
    const expected = cold('--b', { b: completion});
    expect(effects.updateProspection$).toBeObservable(expected);
  })

  it('should dispatch update error', () => {
    const error = new Error('Error updating prospection from mocked http service.');
    const completion = updateProspectionFailure({ error });

    actions$ = hot('a', { a: updateProspection({ prospection: {...ProspectionDtoMock1}}) });
    dataService.update.and.returnValue(cold('--#', {}, { error }));
    const expected = cold('--b', { b: completion });
    expect(effects.updateProspection$).toBeObservable(expected);
  })

  it('should dispatch delete success', () => {
    const completion = deleteProspectionSuccess({ id: '1' });
    actions$ = hot('a', { a: deleteProspection({ id: '1' }) });
    dataService.delete.and.returnValue(cold('--b', { b: '1' }));
    const expected = cold('--b', { b: completion });
    expect(effects.deleteProspection$).toBeObservable(expected);
  })

  it('should dispatch delete error', () => {
    const error = new Error('Error deleting prospection from mocked http service.');
    const completion = deleteProspectionFailure({ error });

    actions$ = hot('a', { a: deleteProspection({ id: '1' }) });
    dataService.delete.and.returnValue(cold('--#', {}, { error }));
    const expected = cold('--b', { b: completion });
    expect(effects.deleteProspection$).toBeObservable(expected);
  })

})