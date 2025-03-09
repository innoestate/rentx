import { Owner } from "src/app/core/models/owner.model";
import { Estate_Dto } from "./estate.dto.model";
import { Lodger } from "src/app/lodgers/models/lodger.model";


export interface Estate extends Estate_Dto {
  address: string,
  plot_address: string,
  owner: Owner | undefined;
  lodger: Lodger | undefined;
  rents: { year: number, month: number, rent: number }[];
  actualMonthPaid: boolean;
  rentReceiptSentByEmail: boolean;
};
