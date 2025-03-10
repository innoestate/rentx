import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Prospection } from '../../models/prospection.model';
import { ProspectionsHttpService } from '../http/prospections.http.service';
import {
  createProspection,
  createProspectionSuccess,
  loadProspections,
  loadProspectionsSuccess,
  removeProspection,
  removeProspectionFailure,
  removeProspectionSuccess,
  updateProspection,
  updateProspectionFailure,
  updateProspectionSuccess
} from './prospections.actions';

@Injectable()
export class ProspectionsEffects {
  constructor(
    private actions$: Actions,
    private prospectionsService: ProspectionsHttpService
  ) { }

  loadProspections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProspections),
      switchMap(() => this.prospectionsService.getAll()),
      map((prospections: Prospection[]) => (loadProspectionsSuccess({ prospections })))
    )
  );

  createProspection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProspection),
      mergeMap(action =>
        this.prospectionsService.create(action.prospection).pipe(
          map((newProspection: Prospection) => (createProspectionSuccess({ prospection: newProspection })))
        )
      )
    )
  );

  updateProspection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProspection),
      mergeMap(action =>
        this.prospectionsService.update(action.id, action.changes).pipe(
          map(() => updateProspectionSuccess({ id: action.id, changes: action.changes })),
          catchError(error => of(updateProspectionFailure({ error })))
        )
      )
    )
  );

  removeProspection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeProspection),
      mergeMap(action =>
        this.prospectionsService.delete(action.id).pipe(
          map(() => removeProspectionSuccess({ id: action.id })),
          catchError(error => of(removeProspectionFailure({ error })))
        )
      )
    )
  );
}
