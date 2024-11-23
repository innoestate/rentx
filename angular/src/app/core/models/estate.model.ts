import { Estate_Dto } from './dtos/estate.dto.model';
import { Owner } from './owner.model';

export interface Estate extends Estate_Dto {
  address: string,
  owner: Owner | undefined;
};
