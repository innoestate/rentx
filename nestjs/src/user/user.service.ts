import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  create(email: string): Observable<User> {
    return from(this.usersRepository.findOne({
      where: { email }
    })).pipe(
      switchMap(user => {
        if (!user) {
          const user = this.usersRepository.create({
            email
          });
          return from(this.usersRepository.save(user));
        } else {
          return of(user);
        }
      }
      ));
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email']
    });
  }

  findById(id: string): Observable<User> {
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