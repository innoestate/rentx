import { Estate_Dto } from './dtos/estate.dto.model';
import { Lodger } from './lodger.model';
import { Owner } from './owner.model';

export interface Estate extends Estate_Dto {
  address: string,
  plot_address: string,
  owner: Owner | undefined;
  lodger: Lodger | undefined;
  rents: { year: number, month: number, rent: number }[];
};
