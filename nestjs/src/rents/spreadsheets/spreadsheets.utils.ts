import { Estate_filled_Db } from "src/estates/estate-filled-db.model";

export const estateIsSameThatRow = (estate: Estate_filled_Db | { street, city, plot }, street, city, plot) => {
    return estate.street === street
        && (((!city || city === '') && (!estate?.city || estate?.city === '')) || (city === '' && estate?.city === '') || estate?.city === city)
        && (((!plot || plot === '') && (!estate?.plot || estate?.plot === '')) || (plot === '' && estate?.plot === '') || estate?.plot === plot);
}