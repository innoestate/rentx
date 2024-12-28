import { createAction, props } from '@ngrx/store';
import { Prospection_Dto } from '../models/dtos/prospection.dto.model';
import { Prospection } from '../models/prospection.model';

export const loadProspections = createAction('[Prospections] Load Prospections');
export const loadProspectionsSuccess = createAction('[Prospections] Load Prospections Success', props<{ prospections: Prospection[] }>());
export const loadProspectionsFailure = createAction('[Prospections] Load Prospections Failure', props<{ error: any }>());

export const createProspection = createAction('[Prospection] Create Prospection', props<{ prospection: Prospection_Dto }>());
export const createProspectionSuccess = createAction('[Prospection] Create Prospection Success', props<{ prospection: Prospection }>());
export const createProspectionFailure = createAction('[Prospection] Create Prospection Failure', props<{ error: any }>());
