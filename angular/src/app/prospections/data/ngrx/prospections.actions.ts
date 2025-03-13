import { createAction, props } from '@ngrx/store';
import { Prospection_Dto } from '../../models/prospection.dto.model';

export const loadProspections = createAction('[Prospections] Load Prospections');
export const loadProspectionsSuccess = createAction('[Prospections] Load Prospections Success', props<{ prospections: Prospection_Dto[] }>());
export const loadProspectionsFailure = createAction('[Prospections] Load Prospections Failure', props<{ error: any }>());

export const createProspection = createAction('[Prospection] Create Prospection', props<{ prospection: Prospection_Dto }>());
export const createProspectionSuccess = createAction('[Prospection] Create Prospection Success', props<{ prospection: Prospection_Dto }>());
export const createProspectionFailure = createAction('[Prospection] Create Prospection Failure', props<{ error: any }>());

export const deleteProspection = createAction('[Prospection] Delete Prospection', props<{ id: string }>());
export const deleteProspectionSuccess = createAction('[Prospection] Delete Prospection Success', props<{ id: string }>());
export const deleteProspectionFailure = createAction('[Prospection] Delete Prospection Failure', props<{ error: any }>());

export const updateProspection = createAction('[Prospection] Update Prospection', props<{ prospection: Partial<Prospection_Dto> }>());
export const updateProspectionSuccess = createAction('[Prospection] Update Prospection Success', props<{ prospection: Partial<Prospection_Dto> }>());
export const updateProspectionFailure = createAction('[Prospection] Update Prospection Failure', props<{ error: any }>());

export const reloadProspection = createAction('[Prospection] Reload Prospection', props<{ prospectionId: string }>());
