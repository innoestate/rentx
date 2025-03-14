import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Prospection } from '../../models/prospection.model';
import { ProspectionsHttpService } from '../http/prospections.http.service';
import {
  createProspection,
  createProspectionFailure,
  createProspectionSuccess,
  loadProspections,
  loadProspectionsFailure,
  loadProspectionsSuccess,
  deleteProspection,
  deleteProspectionFailure,
  deleteProspectionSuccess,
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
      switchMap(() => this.prospectionsService.getAll().pipe(
        map((prospections: Prospection[]) => (loadProspectionsSuccess({ prospections }))),
        catchError(err => of(loadProspectionsFailure(err)))
      ))
    )
  );

  createProspection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProspection),
      switchMap(action =>
        this.prospectionsService.create(action.prospection).pipe(
          map((newProspection: Prospection) => (createProspectionSuccess({ prospection: newProspection }))),
          catchError(err => of(createProspectionFailure(err)))
        )
      )
    )
  );

  updateProspection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProspection),
      switchMap(({ prospection }) => this.prospectionsService.update(prospection.id!, prospection).pipe(
        map(() => updateProspectionSuccess({ prospection })),
        catchError(err => of(updateProspectionFailure(err)))
      )
      )
    )
  );

  deleteProspection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProspection),
      mergeMap(action =>
        this.prospectionsService.delete(action.id).pipe(
          map(() => deleteProspectionSuccess({ id: action.id })),
          catchError(err => of(deleteProspectionFailure(err)))
        )
      )
    )
  );
}
