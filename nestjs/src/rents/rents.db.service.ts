import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { Rent_Dto } from './rents.dto.model';
import { Rent_Entity } from './rents.entity';


@Injectable()
export class RentsDbService {

  constructor(
    @InjectRepository(Rent_Entity)
    private rentsRepository: Repository<Rent_Entity>,
  ) { }

  create(rentDto: Rent_Dto): Observable<Rent_Entity> {
    const rent = this.rentsRepository.create(rentDto);
    return from(
        this.rentsRepository.upsert(rent, {
            conflictPaths: ['estate_id', 'lodger_id', 'start_date', 'end_date'],
        }).then(() => rent) // Return the rent entity after upsert
    )
}

  getByEstate(estateId: string): Observable<Rent_Entity[]> {
    return from(this.rentsRepository.find({ where: { estate_id: estateId } })) as Observable<Rent_Entity[]>;
  }

  update(rent: DeepPartial<Rent_Entity>): Observable<any> {
    return from(this.rentsRepository.update(rent.id, rent));
  }

  delete(id: string): Observable<any> {
    return from(this.rentsRepository.delete(id));
  }

}