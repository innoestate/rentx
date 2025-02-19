import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, Observable, switchMap } from 'rxjs';
import { Owner_Dto } from '../../owners/owners-dto.model';
import { Repository } from 'typeorm';
import { Owner_Entity } from '../../owners/owners.entity';
import { User } from '../user.entity';
import { UserDbService } from './user.db.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Owner_Entity) private ownerRepository: Repository<Owner_Entity>,
    private userServiceDb: UserDbService
  ) { }

  getOrCreateByEmail(email: string, data: Partial<User>): Observable<User> {
    return this.userServiceDb.getByEmail(email).pipe(
      catchError(() => {
        return this.userServiceDb.create(email, data);
      })
    );
  }

  createWithOwner(email: string, ownerData: Owner_Dto){
    return this.userServiceDb.create(email, ownerData);
  }

  updateGoogleRefreshToken(id: string, refresh_token: string): Observable<User> {
    return from(this.usersRepository.update(id, { refresh_token })).pipe(
      switchMap(() => this.getById(id))
    );
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email']
    });
  }

  getById(id: string): Observable<User> {
    const user = this.usersRepository.findOne({
      where: { id },
      select: ['id', 'email']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return from(user);
  }
}