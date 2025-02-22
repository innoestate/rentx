import { FormGroup } from '@angular/forms';
import { Estate_Dto } from '../models/dtos/estate.dto.model';
import { Lodger_Dto } from '../models/dtos/lodger.dto.model';
import { MonthlyRents_Dto } from '../models/dtos/monthly-rents.dto.model';
import { Owner_Dto } from '../models/dtos/owner.dto.model';
import { Estate } from '../models/estate.model';
import { Estate_Form } from '../models/forms/estate-form.model';
import { Rent } from '../models/rent.model';
import { Estate_Post_Request } from '../models/requests/estate-post-request.model';

export const formatEstateToEstateFormToEstatePostRequest = (estate: FormGroup<Estate_Form>): Estate_Post_Request => {
  let ownerId = estate.get('owner_id')?.value;
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

export const formatEstateDtoToEstateUx = (estate: Estate_Dto, owners: Owner_Dto[], lodgers: Lodger_Dto[], monthlyRents: Rent[]): Estate => {
  return {
    ...estate,
    address: estate.street + ' ' + estate.city + ' ' + estate.zip,
    plot_address: estate.plot ? 'LOT ' + estate.plot + ' / ' + estate.street + ' ' + estate.city + ' ' + estate.zip : estate.street + ' ' + estate.city + ' ' + estate.zip,
    owner: owners.find(owner => owner.id+'' === estate.owner_id+''),
    lodger: lodgers.find(lodger => lodger.id+'' === estate.lodger_id+''),
    rents: monthlyRents,
    actualMonthPaid: lodgerHasPaidRent(monthlyRents),
    rentReceiptSentByEmail: lodgerSentRentReceipt(monthlyRents)
  }
}

export const formatEstatesDtoToEstateUx = (estates: Estate_Dto[], owners: Owner_Dto[], lodgers: Lodger_Dto[], monthlyRents: MonthlyRents_Dto[]): Estate[] => {
  return estates.map(estate => formatEstateDtoToEstateUx(estate, owners, lodgers, monthlyRents.find(rent => rent.estateId === estate.id)?.rents??[] ));
}


const lodgerHasPaidRent = (rents: Rent[]) => {
  const actualDate = new Date();
  let hasPaid = false;
  rents.forEach(rent => {
    if (actualDate.getFullYear() === rent.year && actualDate.getMonth() === rent.month) {
      hasPaid = true;
    }
  });
  return hasPaid
}

const lodgerSentRentReceipt = (rents: Rent[]): boolean => {
  const actualDate = new Date();
  const rent = rents.find(rent => rent.year === actualDate.getFullYear() && rent.month === actualDate.getMonth());
  return !!rent?.sent;
}
