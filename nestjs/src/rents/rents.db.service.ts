import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { Rent_Dto } from './rents.dto.model';
import { Rent_Entity } from './rents.entity';
import { Rent_Db } from './rents.db';


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
            conflictPaths: ['user_id', 'estate_id', 'lodger_id', 'start_date', 'end_date'],
        }).then(() => rent)
    )
  }

  getByEstate(estateId: string): Observable<Rent_Entity[]> {
    return from(this.rentsRepository.find({ where: { estate_id: estateId } })) as Observable<Rent_Entity[]>;
  }

  getByUserId(userId: string): Observable<Rent_Db[]> {
    return from(this.rentsRepository.find({ where: { user_id: userId } })).pipe(
      map(rents => {
        return rents.map(rent => {
          return {
            ...rent,
            totalRent: rent.rent + rent.charges,
            start_date: new Date(rent.start_date),
            end_date: new Date(rent.end_date),
          }
        })
      })
    ) as Observable<any>;
  }

  update(rent: DeepPartial<Rent_Entity>): Observable<any> {
    return from(this.rentsRepository.update(rent.id, rent));
  }

  delete(id: string): Observable<any> {
    return from(this.rentsRepository.delete(id));
  }

}