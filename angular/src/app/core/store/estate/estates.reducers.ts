import { createReducer, on } from "@ngrx/store";
import { Estate_Dto } from "../../models/dtos/estate.dto.model";
import { createEstateSuccess, deleteEstateSuccess, editEstateSuccess, loadEstatesSuccess } from "./estates.actions";

export interface State {
  estates: Estate_Dto[];
}

export const initialState: State = {
  estates: [],
};

export const estatesReducer = createReducer(
  initialState,
  on(loadEstatesSuccess, (state, data) => {
    return {
      ...state,
      estates: data.estates
    }
  }),
  on(createEstateSuccess, (state, data) => {
    return {
      ...state,
      estates: [...state.estates, data.estate]
    }
  }),
  on(deleteEstateSuccess, (state, data) => {
    return {
      ...state,
      estates: state.estates.filter(estate => estate.id !== data.estate.id)
    }
  }),
  on(editEstateSuccess, (state, data) => {
    return {
      ...state,
      estates: state.estates.map(estate => estate.id === data.estate.id ? ({...estate, ...data.estate}) : estate)
    }
  })
)
