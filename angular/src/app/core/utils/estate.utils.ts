import { Estate_Form } from '../models/forms/estate-form.model';
import { Estate_Post_Request } from '../models/requests/estate-post-request.model';
import { FormGroup } from '@angular/forms';
import { Estate_Dto } from '../models/dtos/estate.dto.model';
import { Estate } from '../models/estate.model';
import { Owner } from '../models/owner.model';
import { Owner_Dto } from '../models/dtos/owner.dto.model';
import { Lodger_Dto } from '../models/dtos/lodger.dto.model';

export const formatEstateToEstateFormToEstatePostRequest = (estate: FormGroup<Estate_Form>): Estate_Post_Request => {
  let ownerId = estate.get('owner')?.value;
  if(typeof ownerId !== 'string' && typeof ownerId !== 'number') {
    if( ownerId ){
      ownerId = (estate.get('owner')?.value as Owner)?.id;
    }
  }
  return {
    street: estate.get('street')!.value,
    city: estate.get('city')!.value,
    zip: estate.get('zip')!.value,
    plot: estate.get('plot')?.value,
    rent: estate.get('rent')?.value,
    charges: estate.get('charges')?.value,
    owner_id: ownerId as any,
    lodger_id: estate.get('lodger')?.value
  }

}

export const formatEstateDtoToEstateUx = (estate: Estate_Dto, owners: Owner_Dto[], lodgers: Lodger_Dto[]): Estate => {
  return {
    ...estate,
    address: estate.street + ' ' + estate.city + ' ' + estate.zip,
    plot_address: estate.plot ? 'LOT ' + estate.plot + ' / ' + estate.street + ' ' + estate.city + ' ' + estate.zip : estate.street + ' ' + estate.city + ' ' + estate.zip,
    owner: owners.find(owner => owner.id+'' === estate.owner_id+''),
    lodger: lodgers.find(lodger => lodger.id+'' === estate.lodger_id+'')
  }
}

export const formatEstatesDtoToEstateUx = (estates: Estate_Dto[], owners: Owner_Dto[], lodgers: Lodger_Dto[]): Estate[] => {
  return estates.map(estate => formatEstateDtoToEstateUx(estate, owners, lodgers));
}
