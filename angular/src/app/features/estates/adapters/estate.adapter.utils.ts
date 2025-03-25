import { Lodger_Dto } from 'src/app/features/lodgers/models/lodger.dto.model';
import { Owner_Dto } from 'src/app/features/owners/models/owner.dto.model';
import { EstateRents } from 'src/app/features/rents/models/estate.rents.model';
import { Rent } from 'src/app/features/rents/models/rent.model';
import { Estate_Dto } from '../models/estate.dto.model';
import { Estate } from '../models/estate.model';

export const fillEstate = (estate: Estate_Dto, owners: Owner_Dto[], lodgers: Lodger_Dto[], monthlyRents: Rent[]): Estate => {
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

export const fillEstates = (estates: Estate_Dto[], owners: Owner_Dto[], lodgers: Lodger_Dto[], monthlyRents: EstateRents[]): Estate[] => {
  return estates.map(estate => fillEstate(estate, owners, lodgers, monthlyRents.find(estateRents => estateRents.estateId === estate.id)?.rents??[] ));
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
