import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { Docs_Entity } from './docs.entity';
import { Docs_Dto } from './docs.dto.model';

@Injectable()
export class DocsDbService {
  constructor(
    @InjectRepository(Docs_Entity)
    private docsRepository: Repository<Docs_Entity>
  ) {}

  create(docsDto: Docs_Dto): Observable<Docs_Entity> {
    try{
      const docs = this.docsRepository.create(docsDto);
      return from(this.docsRepository.save(docs));
    }catch(e){
      console.error('DocsDbService.create', e);
      return null;
    }
  }

  getByUser(userId: string): Observable<Docs_Entity[]> {
    try{
      return from(
        this.docsRepository.find({ where: { user_id: userId } })
      ) as Observable<Docs_Entity[]>;
    }catch(e){
      console.error('DocsDbService.getByUser', e);
      return null;
    }
  }

  update(docs: DeepPartial<Docs_Entity>): Observable<any> {
    return from(this.docsRepository.update(docs.id, docs));
  }

  delete(id: string): Observable<any> {
    return from(this.docsRepository.delete(id));
  }

  deleteByUserId(user_id: string): Observable<any> {
    return from(this.docsRepository.delete({ user_id }));
  }
}