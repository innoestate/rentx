import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { Estate } from './estate.entity';
import { Estate_Db } from './estate-db.model';

@Injectable()
export class EstatesService {

  constructor(
    @InjectRepository(Estate)
    private estateRepository: Repository<Estate>,
  ) { }

  create(estateDb: Estate_Db): Observable<Estate> {
    const estate = this.estateRepository.create(estateDb);
    return from(this.estateRepository.save(estate));
  }

  async getByUser(userId: string): Promise<Estate[] | undefined> {
    return this.estateRepository.find({
      where: { user_id: userId }
    });
  }

}