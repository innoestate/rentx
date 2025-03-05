import { FormGroup } from '@angular/forms';
import { Estate_Dto } from '../../models/estate.dto.model';
import { Lodger_Dto } from 'src/app/core/models/dtos/lodger.dto.model';
import { Owner_Dto } from 'src/app/core/models/dtos/owner.dto.model';
import { Rent } from 'src/app/core/models/rent.model';
import { Estate } from '../../models/estate.model';
import { Estate_Form } from '../../models/estate-form.model';
import { MonthlyRents_Dto } from 'src/app/core/models/dtos/monthly-rents.dto.model';

export const formatEstateToEstateFormToEstatePostRequest = (estate: FormGroup<Estate_Form>): Estate_Dto => {
  let ownerId = estate.get('owner_id')?.value;
  return {
    street: estate.get('street')!.value,
    city: estate.get('city')!.value,
    zip: estate.get('zip')!.value,
    plot: estate.get('plot')?.value,
    rent: estate.get('rent')?.value??0,
    charges: estate.get('charges')?.value??0,
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
