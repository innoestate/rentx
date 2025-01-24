import { SellerDb } from "src/sellers/models/seller.db";
import { ProspectionDb } from "./prospection.db";

export interface ProspectionBuilded extends ProspectionDb {
    statusTranslated: string;
    seller?: SellerDb
}