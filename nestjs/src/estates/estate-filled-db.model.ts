import { Owner_Db } from "src/owners/owners-db.model";
import { Estate_Db } from "./estate-db.model";
import { Lodger_Db } from "src/lodgers/lodger-db.model";

export interface Estate_filled_Db extends Estate_Db {
    owner: Owner_Db;
    lodger: Lodger_Db;
}