import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { Lodger_Entity } from './lodger.entity';
import { Lodger_Post } from './lodger-post.model';

@Injectable()
export class LodgersService {

  constructor(
    @InjectRepository(Lodger_Entity)
    private lodgerRepository: Repository<Lodger_Entity>,
  ) { }

  create(lodgerPost: Lodger_Post): Observable<Lodger_Entity> {
    const lodger = this.lodgerRepository.create(lodgerPost);
    return from(this.lodgerRepository.save(lodger));
  }

  getByUser(userId: string): Observable<Lodger_Entity[]> {
    return from(this.lodgerRepository.find({ where: { user_id: userId } }));
  }

  update(lodger: DeepPartial<Lodger_Entity>): Observable<any> {
    return from(this.lodgerRepository.update(lodger.id, lodger));
  }

  delete(id: string): Observable<any> {
    return from(this.lodgerRepository.delete(id));
  }


}