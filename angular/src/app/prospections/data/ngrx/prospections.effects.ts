import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
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
      tap(({ prospection }) => console.log('prospection', prospection)),
      mergeMap(({ prospection }) => this.prospectionsService.update(prospection.id!, prospection).pipe(
          map(() => updateProspectionSuccess({ prospection })),
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
