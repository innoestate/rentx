import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { Owner_Dto } from './owners-dto.model';
import { Owner_Entity } from './owners.entity';

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

  async getByUser(userId: string): Promise<Owner_Entity[] | undefined> {
    return this.ownerRepository.find({
      where: { user_id: userId }
    });
  }

}