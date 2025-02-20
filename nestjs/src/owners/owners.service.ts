import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { DatabaseError } from '../errors/data.error';
import { Owner_Db } from './owners-db.model';
import { Owner_Dto } from './owners-dto.model';
import { Owner_Entity } from './owners.entity';

@Injectable()
export class OwnersService {

  constructor(
    @InjectRepository(Owner_Entity)
    private ownerRepository: Repository<Owner_Entity>,
  ) { }

  create(ownerDto: Owner_Dto): Observable<Owner_Entity> {
    try {
      const owner = this.ownerRepository.create(ownerDto);
      return from(this.ownerRepository.save(owner));
    }catch(err) {
      throw new DatabaseError(`Error creating owner: ${err.message}`);
    }
  }

  update(ownerDto: DeepPartial<Owner_Entity>): Observable<any> {
    return from(this.ownerRepository.update(ownerDto.id, ownerDto));
  }

  delete(id: string): Observable<any> {
    return from(this.ownerRepository.delete(id));
  }

  getByUser(userId: string): Observable<Owner_Db[]> {
    return from(this.ownerRepository.find({ where: { user_id: userId } }));
  }

}