import { Estate_Dto } from 'src/app/core/models/dtos/estate.dto.model';

export interface EstatesState {
  estates_dto: Estate_Dto[] | null;
}

export const initialUserState: EstatesState = {
  estates_dto: null
}
