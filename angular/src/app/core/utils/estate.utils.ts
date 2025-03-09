import { Estate_Dto } from 'src/app/estates/models/estate.dto.model';
import { Estate } from 'src/app/estates/models/estate.model';
import { Lodger_Dto } from '../../lodgers/models/lodger.dto.model';
import { MonthlyRents_Dto } from '../models/dtos/monthly-rents.dto.model';
import { Owner_Dto } from '../../owners/models/owner.dto.model';
import { Rent } from '../../rents/models/rent.model';



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
