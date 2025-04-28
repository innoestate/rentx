import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { GoogleConnect } from "src/google/models/google.connect.model";
import { Rent_Db } from "src/rents/models/rents.db.model";

export interface EstatesGoogleSheet {
    spreadSheetId?: string;
    google: GoogleConnect,
    estates: Estate_filled_Db[];
    rents: Rent_Db[];
}