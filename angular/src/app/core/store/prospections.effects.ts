import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Prospection } from '../models/prospection.model';
import { ProspectionsHttpService } from '../services/prospections.http.service';
import { createProspection, createProspectionSuccess, loadProspections, loadProspectionsSuccess, removeProspection, removeProspectionSuccess, removeProspectionFailure } from './prospections.actions';

@Injectable()
export class ProspectionsEffects {
  constructor(
    private actions$: Actions,
    private prospectionsService: ProspectionsHttpService
  ) { }

  loadProspections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProspections),
      tap(load => console.log('loadProspections', load)),
      switchMap(() => this.prospectionsService.getAll()),
      tap(prospections => console.log('prospections res', prospections)),
      map((prospections: Prospection[]) => (loadProspectionsSuccess({ prospections })))
    )
  );

  createProspection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProspection),
      mergeMap(action =>
        this.prospectionsService.create(action.prospection).pipe(
          tap(console.log),
          map((newProspection: Prospection) => (createProspectionSuccess({ prospection: newProspection })))
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
