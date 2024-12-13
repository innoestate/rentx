import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of, switchMap } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { Estate } from './estate.entity';
import { Estate_Db } from './estate-db.model';
import { Estate_Dto } from './estate-dto.model';

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

  update(estateDto: DeepPartial<Estate>): Observable<any> {
    return from(this.estateRepository.update(estateDto.id, estateDto));
  }

  delete(id: string): Observable<any> {
    return from(this.estateRepository.delete(id));
  }

  getById(id: string): Observable<any> {
    if( !id ) {
      return of(new NotFoundException('id is required'));
    }
    return from(this.estateRepository.findOne({ where: { id } }));
  }

  async getByUser(userId: string): Promise<Estate_Db[] | undefined> {
    return this.estateRepository.find({
      where: { user_id: userId }
    });
  }

}