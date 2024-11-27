import { createReducer, on } from "@ngrx/store";
import { Owner } from "../../models/owner.model";
import { addOwner, addOwnerFailure, addOwnerSuccess, deleteOwner, deleteOwnerFailure, deleteOwnerSuccess, loadOwners, loadOwnersFailure, loadOwnersSuccess, updateOwnerSuccess } from "./owners.actions";

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
    on(addOwner, (state, data) => {
        return {
            ...state,
        }
    }),
    on(addOwnerSuccess, (state, data) => {
        return {
            ...state,
            owners: state.owners.concat(data.owner)
        }
    }),
    on(addOwnerFailure, (state, error) => {
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
            owners: state.owners.map(o => o.id === owner.id ? owner : o),
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
