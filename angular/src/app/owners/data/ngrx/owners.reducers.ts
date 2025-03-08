import { createReducer, on } from "@ngrx/store";
import { Owner } from "../../../core/models/owner.model";
import { createOwner, createOwnerFailure, createOwnerSuccess, deleteOwner, deleteOwnerFailure, deleteOwnerSuccess, loadOwners, loadOwnersFailure, loadOwnersSuccess, updateOwnerSuccess } from "./owners.actions";

export interface State {
    owners: Owner[];
}

export const initialState: State = {
    owners: []
};

export const ownersReducer = createReducer(
    initialState,
    on(loadOwners, (state, data) => {
        return {
            ...state
        }
    }),
    on(loadOwnersSuccess, (state, data) => {
        return {
            ...state,
            owners: data.owners
        }
    }),
    on(loadOwnersFailure, (state, error) => {
        return {
            ...state,
        }
    }),
    on(createOwner, (state, data) => {
        return {
            ...state,
        }
    }),
    on(createOwnerSuccess, (state, data) => {
        return {
            ...state,
            owners: state.owners.concat(data.owner)
        }
    }),
    on(createOwnerFailure, (state, error) => {
        return {
            ...state,
        }
    }),
    on(deleteOwner, (state, data) => {
        return {
            ...state,
        }
    }),
    on(updateOwnerSuccess, (state, {owner}) => {
        return {
            ...state,
            owners: state.owners.map(actualOwner => actualOwner.id === owner.id ? ({...actualOwner, ...owner}) : actualOwner),
        }
    }),
    on(deleteOwnerSuccess, (state, {ownerId}) => {
        return {
            ...state,
            owners: state.owners.filter(owner => owner.id !== ownerId),
        }
    }),
    on(deleteOwnerFailure, (state, error) => {
        return {
            ...state,
        }
    })
)
