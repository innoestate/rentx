import { Estate } from "src/app/estates/models/estate.model";

export const getNeededFieldsForDownloadRentReceipt = (estate: Estate) =>{
    const fields = [];
    if (!estate.owner?.street || estate.owner?.street === '') {
      fields.push('street');
    }
    if (!estate.owner?.city || estate.owner?.city === '') {
      fields.push('city');
    }
    if (!estate.owner?.zip || estate.owner?.zip === '') {
      fields.push('zip');
    }
    if (!estate.rent || estate.rent === 0) {
      fields.push('rent');
    }
    if (!estate.charges || estate.charges === 0) {
      fields.push('charges');
    }
    if (!estate.owner?.signature || estate.owner?.signature === '') {
      fields.push('signature');
    }
    return fields;
  }
