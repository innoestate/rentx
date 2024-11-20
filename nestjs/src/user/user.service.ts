import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of, switchMap, tap } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Owner_Entity } from '../owners/owners.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Owner_Entity) private ownerRepository: Repository<Owner_Entity>
  ) { }

  create(email: string, data: any): Observable<User> {
    return from(this.usersRepository.findOne({
      where: { email }
    })).pipe(
      switchMap(user => {
        if (!user) {
          const user = this.usersRepository.create({
            email
          });
          return from(this.usersRepository.save(user)).pipe(
            tap( createdUser => {
              // this.ownerRepository.save({});
              const owner = this.ownerRepository.create({
                user_id: createdUser.id,
                email,
                name: data?.name??'',
                street: '',
                city: '',
                zip: '',
                signature: '',
                phone: ''
              });
              this.ownerRepository.save(owner);
            })
          );
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