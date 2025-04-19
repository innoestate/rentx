import { createAction, props } from '@ngrx/store';
import { PropertiesDisplay } from '../../../models/properties.display-map.model';

export const clearDisplayedComponents = createAction('[Properties] Clear displayed components');
export const addDisplayedComponent = createAction('[Properties] Add displayed element', props<{ component: PropertiesDisplay }>());
export const removeDisplayedComponent = createAction('[Properties] Remove displayed element', props<{ component: PropertiesDisplay }>());
export const navigate = createAction('[Properties] Navigate', props<{ navigation: 'estates' | 'owners' | 'lodgers' }>());
