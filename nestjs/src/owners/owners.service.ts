import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { Owner_Dto } from './owners-dto.model';
import { Owner_Entity } from './owners.entity';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class OwnersService {

  constructor(
    @InjectRepository(Owner_Entity)
    private ownerRepository: Repository<Owner_Entity>,
  ) { }

  create(ownerDto: Owner_Dto): Observable<Owner_Entity> {
    const owner = this.ownerRepository.create(ownerDto);
    return from(this.ownerRepository.save(owner));
  }

  update(ownerDto: DeepPartial<Owner_Entity>): Observable<any> {
    return from(this.ownerRepository.update(ownerDto.id, ownerDto));
  }

  delete(id: string): Observable<any> {
    return from(this.ownerRepository.delete(id));
  }

  getByUser(userId: string): Observable<Owner_Entity[]> {
    return from(this.ownerRepository.find({ where: { user_id: userId } }));
  }

}