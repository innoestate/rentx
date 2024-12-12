/**
 * For adding a new period, fusion it to the existings periods, providing all the the periods that need to be removed, updated, or added to fusion it in a db.
 *
 * @param {Rent_Db[]} rents - The list of existing rent periods.
 * @param {string} estate_id - The ID of the estate.
 * @param {string} owner_id - The ID of the owner.
 * @param {Date} startDate - The start date of the new rent period.
 * @param {Date} endDate - The end date of the new rent period.
 * @param {number} rent - The rent amount for the new period.
 * @param {number} charges - The charges amount for the new period.
 * @returns {{ removePeriods: Rent_Db[], updatePeriods: Rent_Db[], addPeriods: Rent_Db[] }} An object containing arrays of rent periods to be removed, updated, and added.
 */
import { Rent_Db } from "./rents.db"


export const addRentPeriod = (existingPeriods: Rent_Db[], newPeriod: Rent_Db): { removePeriods: Rent_Db[], updatePeriods: Rent_Db[], addPeriods: Rent_Db[] } => {

    return { removePeriods: [], updatePeriods: [], addPeriods: [] }
}